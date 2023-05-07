import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (property: string, eCtx: ExecutionContext) => {
    const ctx = eCtx.getArgByIndex(1)
    return property ? ctx.req.user && ctx.req.user[property] : ctx.req.user
  },
)
