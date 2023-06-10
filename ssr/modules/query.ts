import type { z } from 'zod'

import type { Module } from '.'

export const query = <TSchema>(schema: z.Schema<TSchema>) =>
  (async (req) => {
    const queryStringValues = Object.fromEntries(req.nextUrl.searchParams)

    const validatedSchema = await schema.parse(queryStringValues)
    return { next: { query: validatedSchema } }
  }) satisfies Module
