import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsInt({ message: 'Выберите пользователя.' })
  @IsNotEmpty({ message: 'Пользователь обязателен.' })
  user_id: number;

  @ApiProperty()
  @IsInt({ message: 'Выберите фильм или сериал.' })
  @IsNotEmpty({ message: 'Фильм или сериал обязателен.' })
  title_id: number;

  @ApiProperty({ minimum: 1, maximum: 10 })
  @IsInt({ message: 'Оценка должна быть числом.' })
  @Min(1, { message: 'Оценка не может быть меньше 1.' })
  @Max(10, { message: 'Оценка не может быть больше 10.' })
  score: number;
}