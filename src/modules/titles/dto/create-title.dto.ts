import { ApiProperty } from '@nestjs/swagger';

export class CreateTitleDto {
  @ApiProperty({ enum: ['MOVIE', 'SERIAL'] })
  type: 'MOVIE' | 'SERIAL';

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  original_name?: string;

  @ApiProperty({ required: false })
  year?: number;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  poster_url?: string;

  @ApiProperty({ required: false })
  genres?: string;

  @ApiProperty({ required: false })
  popularity?: number;

  @ApiProperty({ required: false })
  runtime_minutes?: number;
}
