import { Global, Module } from '@nestjs/common'
import { CurrentUser } from '@/src/auth/current-user.service'
import { PrismaService } from '@/src/prisma/prisma.service'

@Global()
@Module({
  providers: [CurrentUser, PrismaService],
  exports: [CurrentUser, PrismaService],
})
export class GlobalModule {}
