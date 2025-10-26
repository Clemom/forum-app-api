import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.post.findMany({
      include: {
        author: { select: { username: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async create(dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        author: { connect: { id: 1 } },
      },
    })
  }

  async vote(id: number, dir: 'up' | 'down') {
    const delta = dir === 'up' ? 1 : -1
    return this.prisma.post.update({
      where: { id },
      data: { score: { increment: delta } },
      select: { id: true, score: true },
    })
  }

  async remove(id: number) {
    await this.prisma.post.delete({ where: { id } })
    return { ok: true }
  }
}
