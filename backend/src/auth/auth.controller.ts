import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { AuthEntity } from './entity/auth.entity'
import { LoginDto } from './dto/login.dto'

import { JwtAuthGuard } from '@/src/auth/guard/jwt-auth.guard'
import { CurrentUser } from '@/src/auth/current-user.service'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly currentUser: CurrentUser,
  ) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password)
  }

  @UseGuards(JwtAuthGuard)
  @Get('authorized')
  async getUsers() {
    const payload = this.currentUser.payload
    const user = await this.currentUser.user

    return {
      user,
      payload,
    }
  }

  @Get('pippo')
  getPippo() {
    return 'pippo'
  }
}
