import { ApiProperty } from '@nestjs/swagger';

export class Rating {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  title_id: number;

  @ApiProperty({ minimum: 1, maximum: 10 })
  score: number;

  @ApiProperty()
  created_at: Date;
}
