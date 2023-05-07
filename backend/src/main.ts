import { NestFactory } from '@nestjs/core'
import { INestApplication, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app/app.module'
import { PrismaService } from './prisma/prisma.service'

const configurePrisma = async (app: INestApplication) => {
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  return app
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  await configurePrisma(app)

  await app.listen(4000)
}

bootstrap().catch(console.error)
