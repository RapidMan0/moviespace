import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateWatchlistDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Выберите пользователя.' })
  user_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'Выберите фильм или сериал.' })
  title_id?: number;
}
