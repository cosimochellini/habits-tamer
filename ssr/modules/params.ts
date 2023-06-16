import type { z } from 'zod'

import type { Module } from '.'

export const params = <TSchema>(schema: z.Schema<TSchema>) =>
  (async (_, { params }) => {
    const validatedSchema = await schema.parse(params)
    return { params: validatedSchema }
  }) satisfies Module
