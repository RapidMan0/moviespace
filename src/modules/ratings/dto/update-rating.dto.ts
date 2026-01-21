import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, Max, IsOptional } from 'class-validator';

export class UpdateRatingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Выберите пользователя.' })
  user_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Выберите фильм или сериал.' })
  title_id?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 10 })
  @IsOptional()
  @IsInt({ message: 'Оценка должна быть числом.' })
  @Min(1, { message: 'Оценка не может быть меньше 1.' })
  @Max(10, { message: 'Оценка не может быть больше 10.' })
  score?: number;
}