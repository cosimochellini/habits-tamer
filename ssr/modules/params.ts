import { z } from 'zod'
import { Module } from './'

export const params = <TSchema>(schema: z.Schema<TSchema>) =>
  (async (_, { params }) => {
    const validatedSchema = await schema.parse(params)
    return { next: { params: validatedSchema } }
  }) satisfies Module
