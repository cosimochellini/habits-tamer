import { JwtService } from '@nestjs/jwt'

import { AppService } from './app/app.service'
import { UserService } from './user/user.service'
import { PrismaService } from './prisma/prisma.service'
import { AuthService } from './auth/auth.service'

export const providers = [
  AppService,
  UserService,
  PrismaService,
  AuthService,
  JwtService,
]
