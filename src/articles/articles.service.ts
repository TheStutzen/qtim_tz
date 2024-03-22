import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto, id: number) {
    const isExist = await this.articleRepository.findOne({
      where: {
        user: { id },
        title: createArticleDto.title,
        description: createArticleDto.description,
      },
    });

    if (isExist) throw new BadRequestException('Данная статья уже существует!');

    const newArticle = {
      title: createArticleDto.title,
      description: createArticleDto.description,
      user: {
        id,
      },
    };

    return await this.articleRepository.save(newArticle);
  }

  async findAll(id: number) {
    return await this.articleRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!article) throw new NotFoundException('Статья не найдена');

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) throw new NotFoundException('Статья не найдена');

    return await this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) throw new NotFoundException('Статья не найдена');

    return await this.articleRepository.delete(id);
  }

  async findDate(date: string): Promise<Article[]> {
    const articles = await this.articleRepository
      .createQueryBuilder('article')
      .where('DATE(article.createdAt) = :date', { date })
      .getMany();

    if (!articles.length) {
      throw new NotFoundException('Статьи за эту дату не найдены!');
    }

    return articles;
  }

  async findAuthor(id: number): Promise<any> {
    const authorWithArticles = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoin('article.user', 'user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'article.id',
        'article.title',
        'article.description',
        'article.createdAt',
      ])
      .where('user.id = :id', { id })
      .getMany();

    if (!authorWithArticles.length) {
      throw new NotFoundException('У пользователя нет статей!');
    }

    return authorWithArticles;
  }
}
