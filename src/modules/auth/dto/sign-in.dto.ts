import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'Пользователь обязателен.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Фильм или сериал обязателен.' })
  password: string;
}