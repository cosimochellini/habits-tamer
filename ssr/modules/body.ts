import type { z } from 'zod'

import type { Module } from '.'

export const body = <TSchema>(schema: z.Schema<TSchema>) =>
  (async ({ json }) => {
    const body = await json()
    const validatedSchema = await schema.parse(body)
    return { body: validatedSchema }
  }) satisfies Module
