import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private id = 1;

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: this.id++,
      email: createUserDto.email,
      password: createUserDto.password,
      name: createUserDto.name,
      role: createUserDto.role ?? 'user',
      created_at: new Date(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User | undefined {
    const user = this.findOne(id);
    if (!user) return undefined;
    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number): boolean {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    this.users.splice(idx, 1);
    return true;
  }
}
