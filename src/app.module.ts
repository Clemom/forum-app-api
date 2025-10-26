import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PostsModule } from './posts/posts.module'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostsModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
