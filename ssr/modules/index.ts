import { NextRequest, NextResponse } from 'next/server'
import { Route, RouteContext } from '@/types/routes'
import { badRequest } from '@/ssr/status'
import { getMessage } from '@/utils/error'

export type Module<TNext = unknown, TError = unknown> = (
  req: NextRequest,
  res: RouteContext<TNext>,
) => Promise<{ next: TNext } | { error: TError }>

export const withModules = <TA, TB>(
  middlewares: [Module<TA>, Module<TB>],
  handler: (req: NextRequest, context: TA & TB) => Promise<NextResponse>,
) =>
  (async (req, context) => {
    try {
      let routeContext = {} as TA & TB

      for (const middleware of middlewares) {
        try {
          const res = await middleware(req, context)

          routeContext = { ...routeContext, ...res }
        } catch (error) {
          return badRequest(getMessage(error))
        }
      }

      return await handler(req, routeContext)
    } catch (error) {
      return badRequest({ error })
    }
  }) satisfies Route
