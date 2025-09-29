import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Введите корректный email.' })
  @IsNotEmpty({ message: 'Email обязателен.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Пароль должен быть строкой.' })
  @IsNotEmpty({ message: 'Пароль обязателен.' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов.' })
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой.' })
  @MinLength(2, { message: 'Имя должно быть не менее 2 символов.' })
  name?: string;

  @ApiProperty({ enum: ['user', 'admin'], required: false })
  @IsOptional()
  @IsEnum(['user', 'admin'], { message: 'Роль должна быть "user" или "admin".' })
  role?: 'user' | 'admin';
}
