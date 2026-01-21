import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, IsOptional, MinLength, IsEnum } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail({}, { message: 'Введите корректный email.' })
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Пароль должен быть строкой.' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов.' })
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой.' })
  @MinLength(2, { message: 'Имя должно быть не менее 2 символов.' })
  name?: string;

  @ApiPropertyOptional({ enum: ['user', 'admin'] })
  @IsOptional()
  @IsEnum(['user', 'admin'], { message: 'Роль должна быть "user" или "admin".' })
  role?: 'user' | 'admin';
}
