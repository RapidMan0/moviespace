import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ enum: ['user', 'admin'] })
  role: 'user' | 'admin';

  @ApiProperty()
  created_at: Date;
}
