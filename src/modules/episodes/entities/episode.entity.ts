import { ApiProperty } from '@nestjs/swagger';

export class Episode {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title_id: number;

  @ApiProperty()
  season_number: number;

  @ApiProperty()
  episode_number: number;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  runtime_minutes?: number;
}
