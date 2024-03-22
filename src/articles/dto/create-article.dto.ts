import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  user?: User;
}
