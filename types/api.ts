/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextResponse } from 'next/server'

type RemoveErrorUnion<T> = T extends { error: any } ? never : T

export type InferResponse<T extends (...args: any) => any> = RemoveErrorUnion<
  ReturnType<T> extends Promise<NextResponse<infer TOut>> ? TOut : never
>
