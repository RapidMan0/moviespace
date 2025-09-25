import { ApiProperty } from '@nestjs/swagger';

export class CreateWatchlistDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  title_id: number;
}