import { ApiProperty } from '@nestjs/swagger';

export class Watchlist {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  title_id: number;

  @ApiProperty()
  created_at: Date;
}
