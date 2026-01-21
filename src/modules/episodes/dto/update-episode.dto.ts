import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateEpisodeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Выберите сериал.' })
  title_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Номер сезона должен быть числом.' })
  season_number?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Номер серии должен быть числом.' })
  episode_number?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Название серии должно быть строкой.' })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой.' })
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Длительность должна быть числом.' })
  runtime_minutes?: number;
}
