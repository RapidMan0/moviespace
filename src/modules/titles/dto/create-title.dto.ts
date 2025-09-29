import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, Min, Max, IsNumber } from 'class-validator';

export class CreateTitleDto {
  @ApiProperty({ enum: ['MOVIE', 'SERIAL'] })
  @IsEnum(['MOVIE', 'SERIAL'], { message: 'Тип должен быть "Фильм" или "Сериал".' })
  type: 'MOVIE' | 'SERIAL';

  @ApiProperty()
  @IsString({ message: 'Название должно быть строкой.' })
  @IsNotEmpty({ message: 'Название обязательно.' })
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Оригинальное название должно быть строкой.' })
  original_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'Год выхода должен быть числом.' })
  @Min(1800, { message: 'Год выхода не может быть меньше 1800.' })
  @Max(new Date().getFullYear(), { message: 'Год выхода не может быть больше текущего.' })
  year?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой.' })
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Ссылка на постер должна быть строкой.' })
  poster_url?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Жанры должны быть строкой.' })
  genres?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Популярность должна быть числом.' })
  popularity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'Длительность должна быть числом.' })
  runtime_minutes?: number;
}
