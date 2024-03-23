import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { RedisCacheService } from 'src/utils/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ArticlesModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, RedisCacheService],
})
export class ArticlesModule {}
