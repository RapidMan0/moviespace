import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';

export class UpdateTitleDto {
  @ApiPropertyOptional({ enum: ['MOVIE', 'SERIAL'] })
  @IsOptional()
  @IsEnum(['MOVIE', 'SERIAL'], { message: 'Тип должен быть "Фильм" или "Сериал".' })
  type?: 'MOVIE' | 'SERIAL';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Название должно быть строкой.' })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Оригинальное название должно быть строкой.' })
  original_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Год выхода должен быть числом.' })
  @Min(1800, { message: 'Год выхода не может быть меньше 1800.' })
  @Max(new Date().getFullYear(), { message: 'Год выхода не может быть больше текущего.' })
  year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой.' })
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Ссылка на постер должна быть строкой.' })
  poster_url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Жанры должны быть строкой.' })
  genres?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Длительность должна быть числом.' })
  runtime_minutes?: number;
}
