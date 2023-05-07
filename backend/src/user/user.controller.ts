import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '@/src/auth/guard/jwt-auth.guard'
import { LocalAuthGuard } from '@/src/auth/guard/local-auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.userService.getUsers()
  }

  @UseGuards(LocalAuthGuard)
  @Get('pippo')
  getPippo() {
    return 'pippo'
  }
}
