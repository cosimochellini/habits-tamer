import { Module } from '@nestjs/common'

import { UserService } from '@/src/user/user.service'
import { UserController } from '@/src/user/user.controller'
import { PrismaService } from '@/src/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
