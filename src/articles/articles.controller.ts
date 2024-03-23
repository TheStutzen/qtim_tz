import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiArticleDelete,
  ApiArticleFindOne,
  ApiArticleList,
  ApiArticleUpdate,
  ApiFindAuthor,
  ApiFindDate,
} from 'src/utils/swagger/swagger.api';

@ApiBearerAuth()
@ApiTags('ApiArtcilesCRUD')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createArticleDto: CreateArticleDto, @Req() req) {
    return this.articlesService.create(createArticleDto, +req.user.id);
  }

  @Get()
  @ApiArticleList()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.articlesService.findAll(+req.user.id);
  }

  @Get(':id')
  @ApiArticleFindOne()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  @ApiArticleUpdate()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiArticleDelete()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }

  @Get('date/:date')
  @ApiFindDate()
  findDate(@Param('date') date: string) {
    return this.articlesService.findDate(date);
  }

  @Get('author/:id')
  @ApiFindAuthor()
  async findAuthor(
    @Param('id') id: number,
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
  ) {
    return this.articlesService.findAuthor(id, page, perPage);
  }
}
