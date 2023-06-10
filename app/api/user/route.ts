import { withModules } from '@/ssr/modules'
import { auth } from '@/ssr/modules/auth'
import { ok } from '@/ssr/status'

export const GET = withModules([auth], async (_, context) => ok(context.user))
