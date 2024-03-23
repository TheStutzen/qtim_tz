import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiFindAll,
  ApiFindOne,
  ApiRemove,
  ApiUpdate,
} from 'src/utils/swagger/swagger.api';

@ApiBearerAuth()
@ApiTags('ApiRegister')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    description: 'Регистрация',
  })
  @ApiResponse({
    status: 201,
    description:
      'Вывод всех данных, пароль выдается в зашифрованном виде argon2 и выдается TOKEN.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Почта уже использована, либо пароль содержит меньше 6 символов.',
  })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':email')
  @ApiFindOne()
  @UseGuards()
  async findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Get()
  @ApiFindAll()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @ApiUpdate()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiRemove()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
