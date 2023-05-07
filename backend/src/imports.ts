import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '@/src/auth/auth.module'
import { UserModule } from '@/src/user/user.module'
import { GlobalModule } from '@/src/global/global.module'
export const imports = [
  ConfigModule.forRoot(),
  AuthModule,
  UserModule,
  GlobalModule,
]
