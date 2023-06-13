import type { NextResponse, NextRequest } from 'next/server'

export type RouteContext<TParams extends Record<string, string> | unknown = unknown> = {
  params: Partial<TParams>
}

export type Route<TParams extends Record<string, string> | unknown = unknown, TResult = unknown> = (
  res: NextRequest,
  context: RouteContext<TParams>,
) => Promise<NextResponse<TResult>>
