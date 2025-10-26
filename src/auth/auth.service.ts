import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10)

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashed,
      },
    })

    return { message: 'User registered', id: user.id, email: user.email }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isValid = await bcrypt.compare(dto.password, user.password)
    if (!isValid) throw new UnauthorizedException('Invalid credentials')

    const token = await this.jwt.signAsync({ sub: user.id, email: user.email })
    return { access_token: token }
  }

  async getMe(userId: number) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true, createdAt: true },
  })
  return user
}

}
