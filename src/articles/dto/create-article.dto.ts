import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class UserIdDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: UserIdDto })
  @Type(() => UserIdDto)
  @ValidateNested()
  @IsOptional()
  user?: UserIdDto;
}
