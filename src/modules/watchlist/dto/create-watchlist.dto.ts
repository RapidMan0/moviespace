import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateWatchlistDto {
  @ApiProperty()
  @IsInt({ message: 'Выберите пользователя.' })
  @IsNotEmpty({ message: 'Пользователь обязателен.' })
  user_id: number;

  @ApiProperty()
  @IsInt({ message: 'Выберите фильм или сериал.' })
  @IsNotEmpty({ message: 'Фильм или сериал обязателен.' })
  title_id: number;
}