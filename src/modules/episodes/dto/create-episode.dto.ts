import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @ApiProperty()
  @IsInt({ message: 'Выберите сериал.' })
  @IsNotEmpty({ message: 'Сериал обязателен.' })
  title_id: number;

  @ApiProperty()
  @IsInt({ message: 'Номер сезона должен быть числом.' })
  @IsNotEmpty({ message: 'Номер сезона обязателен.' })
  season_number: number;

  @ApiProperty()
  @IsInt({ message: 'Номер серии должен быть числом.' })
  @IsNotEmpty({ message: 'Номер серии обязателен.' })
  episode_number: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Название серии должно быть строкой.' })
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой.' })
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'Длительность должна быть числом.' })
  runtime_minutes?: number;
}