import { Prisma } from '@prisma/client'
type Await<T> = T extends Promise<infer U> ? U : T

type User = Prisma.UserGetPayload<false>
