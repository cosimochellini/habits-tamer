import type { NextRequest, NextResponse } from 'next/server'

export type RouteContext<_TParams extends Record<string, string> | unknown = unknown> = {
  params: Promise<Record<string, string | string[]>>
}

export type Route<
  _TParams extends Record<string, string> | unknown = unknown,
  TResult = unknown,
> = (
  res: NextRequest,
  context: { params: Promise<Record<string, string | string[]>> },
) => Promise<NextResponse<TResult>>
