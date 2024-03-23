import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiAuth() {
  return applyDecorators(
    ApiOperation({
      description: 'Авторизация',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string', minLength: 6 },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Выведет id, email и token авторизации',
    }),
    ApiResponse({ status: 400, description: 'Неверный Email или Пароль.' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiProfile() {
  return applyDecorators(
    ApiOperation({
      description: 'Получение профиля пользователя',
    }),
    ApiResponse({
      status: 200,
      description: 'Успешный запрос',
    }),
    ApiResponse({ status: 401, description: 'Пользователь не авторизован' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiFindAll() {
  return applyDecorators(
    ApiOperation({
      description: 'Получение всех пользователей',
    }),
    ApiResponse({
      status: 200,
      description: 'Успешный запрос',
    }),
    ApiResponse({
      status: 400,
      description: 'Нет токена Авторизации',
    }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiFindOne() {
  return applyDecorators(
    ApiOperation({
      description: 'Получение пользователя по email',
    }),
    ApiResponse({
      status: 200,
      description: 'Успешный запрос',
    }),
    ApiResponse({ status: 404, description: 'Пользователь не найден' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiUpdate() {
  return applyDecorators(
    ApiOperation({
      description: 'Обновление информации о пользователе',
    }),
    ApiResponse({
      status: 200,
      description: 'Успешное обновление',
    }),
    ApiResponse({
      status: 401,
      description: 'Нет токена Авторизации',
    }),
    ApiResponse({ status: 404, description: 'Пользователь не найден' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiRemove() {
  return applyDecorators(
    ApiOperation({
      description: 'Удаление пользователя',
    }),
    ApiResponse({
      status: 200,
      description: 'Пользователь успешно удален',
    }),
    ApiResponse({
      status: 401,
      description: 'Нет токена Авторизации',
    }),
    ApiResponse({ status: 404, description: 'Пользователь не найден' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiArticles() {
  return applyDecorators(
    ApiOperation({
      description: 'Работа с сущностью "Статья"',
    }),
  );
}

export function ApiArticleCreate() {
  return applyDecorators(
    ApiOperation({
      description: 'Создание новой статьи',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['title', 'description'],
      },
    }),
    ApiResponse({ status: 201, description: 'Статья успешно создана' }),
    ApiResponse({
      status: 400,
      description: 'Статья с таким заголовком уже существует',
    }),
    ApiResponse({
      status: 401,
      description: 'Нет токена Авторизации',
    }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiArticleList() {
  return applyDecorators(
    ApiOperation({
      description: 'Получение списка статей',
    }),
    ApiResponse({ status: 200, description: 'Список статей' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiArticleFindOne() {
  return applyDecorators(
    ApiOperation({
      description: 'Получение информации о статье по идентификатору',
    }),
    ApiResponse({ status: 200, description: 'Информация о статье' }),
    ApiResponse({ status: 404, description: 'Статья не найдена' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiArticleUpdate() {
  return applyDecorators(
    ApiOperation({
      description: 'Обновление информации о статье',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Информация о статье успешно обновлена',
    }),
    ApiResponse({ status: 404, description: 'Статья не найдена' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiArticleDelete() {
  return applyDecorators(
    ApiOperation({
      description: 'Удаление статьи',
    }),
    ApiResponse({ status: 200, description: 'Статья успешно удалена' }),
    ApiResponse({ status: 404, description: 'Статья не найдена' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiFindDate() {
  return applyDecorators(
    ApiOperation({
      description: 'Поиск статей по дате',
    }),
    ApiResponse({ status: 200, description: 'Успешный запрос' }),
    ApiResponse({
      status: 404,
      description: 'Статьи за указанную дату не найдены',
    }),
  );
}

export function ApiFindAuthor() {
  return applyDecorators(
    ApiOperation({
      description: 'Поиск статей автора с пагинацией',
    }),
    ApiResponse({ status: 200, description: 'Успешный запрос' }),
    ApiResponse({ status: 404, description: 'Статьи автора не найдены' }),
  );
}
