import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello User!'
  }

  getUsers() {
    return this.prisma.user.findMany()
  }
}