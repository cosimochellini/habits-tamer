import { AppService } from './app/app.service'
import { UserService } from './user/user.service'
import { PrismaService } from './prisma/prisma.service'
import { AuthService } from './auth/auth.service'
import { JwtService } from '@nestjs/jwt'

export const providers = [
  AppService,
  UserService,
  PrismaService,
  AuthService,
  JwtService,
]
