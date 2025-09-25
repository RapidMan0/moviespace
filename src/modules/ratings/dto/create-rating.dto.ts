import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  title_id: number;

  @ApiProperty({ minimum: 1, maximum: 10 })
  score: number;
}