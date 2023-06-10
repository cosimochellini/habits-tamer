import { NextResponse } from 'next/server'

export const ok = <T>(body: T) => NextResponse.json(body)

export const badRequest = <T>(error?: T) => NextResponse.json({ error }, { status: 400 })

export const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export const forbidden = () => NextResponse.json({ error: 'Forbidden' }, { status: 403 })

export const notFound = () => NextResponse.json({ error: 'Not Found' }, { status: 404 })

export const internalServerError = <T>(error?: T) => NextResponse.json({ error }, { status: 500 })
