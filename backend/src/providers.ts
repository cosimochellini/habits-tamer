import { AppService } from './app/app.service'
import { UserService } from './user/user.service'
import { PrismaService } from './prisma/prisma.service'

export const providers = [AppService, UserService, PrismaService]
