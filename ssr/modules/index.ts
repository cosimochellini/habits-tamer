import type { NextRequest, NextResponse } from 'next/server'

import type { Route, RouteContext } from '@/types/routes'
import { badRequest } from '@/ssr/status'
import { getMessage } from '@/utils/error'

export type Module<TNext = unknown> = (req: NextRequest, res: RouteContext<TNext>) => Promise<TNext>

export const withModules = <TA, TB, TC, TResult extends NextResponse>(
  middlewares: [Module<TA>] | [Module<TA>, Module<TB>] | [Module<TA>, Module<TB>, Module<TC>],
  handler: (context: TA & TB & TC) => Promise<TResult>,
) =>
  (async (req, context) => {
    try {
      let routeContext = {} as TA & TB & TC

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
