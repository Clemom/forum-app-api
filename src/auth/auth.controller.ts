import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private readonly svc: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.svc.register(dto)
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.svc.login(dto)
  }

  // 🔒 Route protégée : /auth/me
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req) {
    return this.svc.getMe(req.user.userId)
  }
}
