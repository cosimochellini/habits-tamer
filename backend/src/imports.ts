import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

export const imports = [ConfigModule.forRoot(), PassportModule]
