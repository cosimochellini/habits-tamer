import { REQUEST } from '@nestjs/core'
import type { Request } from 'express'
import { Inject, Injectable, Scope } from '@nestjs/common'
import { PrismaService } from '@/src/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class CurrentUser {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly prisma: PrismaService,
  ) {}

  get payload(): JwtPayload {
    return this.request.user as JwtPayload
  }

  private _user: any | undefined = undefined

  get user(): Promise<any> {
    return (async () => {
      if (this._user) return this._user

      this._user = await this.prisma.user.findUnique({
        where: { id: this.payload.userId },
      })

      return this._user
    })()
  }
}
