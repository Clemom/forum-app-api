import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { VoteDto } from './dto/vote.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly svc: PostsService) {}

  @Get()
  list() {
    return this.svc.list()
  }

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.svc.create(dto)
  }

  @Post(':id/vote')
  vote(@Param('id', ParseIntPipe) id: number, @Body() dto: VoteDto) {
    return this.svc.vote(id, dto.dir)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.svc.remove(id)
    return { ok: true }
  }
}
