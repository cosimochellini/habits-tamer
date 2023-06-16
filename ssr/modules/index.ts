import type { NextRequest, NextResponse } from 'next/server'

import type { Route, RouteContext } from '@/types/routes'
import { badRequest } from '@/ssr/status'
import { getMessage } from '@/utils/error'

export type Module<TNext = unknown> = (req: NextRequest, res: RouteContext<TNext>) => Promise<TNext>

export const withModules = <TA, TB, TResult extends NextResponse>(
  middlewares: [Module<TA>, Module<TB>] | [Module<TA>],
  handler: (context: TA & TB) => Promise<TResult>,
) =>
  (async (req, context) => {
    try {
      let routeContext = {} as TA & TB

      // eslint-disable-next-line no-restricted-syntax
      for (const middleware of middlewares) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const res = await middleware(req, context)

          routeContext = { ...routeContext, ...res }
        } catch (error) {
          return badRequest(getMessage(error))
        }
      }

      return await handler(routeContext)
    } catch (error) {
      return badRequest(getMessage(error))
    }
  }) satisfies Route
