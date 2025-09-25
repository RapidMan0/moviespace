import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ enum: ['user', 'admin'], required: false })
  role?: 'user' | 'admin';
}
