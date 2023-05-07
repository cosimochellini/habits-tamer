import { Module } from '@nestjs/common'

import { controllers } from '../controllers'
import { providers } from '../providers'
import { imports } from '../imports'

@Module({
  imports,
  controllers,
  providers,
})
export class AppModule {}
