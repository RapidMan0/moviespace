import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Title } from './entities/title.entity';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';

@Injectable()
export class TitlesService {
  constructor(
    @InjectRepository(Title)
    private titlesRepository: Repository<Title>,
  ) {}

  async create(createTitleDto: CreateTitleDto): Promise<Title> {
    const title = this.titlesRepository.create({
      ...createTitleDto,
      created_at: new Date(),
    });
    return this.titlesRepository.save(title);
  }

  async findAll(): Promise<Title[]> {
    return this.titlesRepository.find();
  }

  async findOne(id: number): Promise<Title | null> {
    return this.titlesRepository.findOneBy({ id });
  }

  async update(id: number, updateTitleDto: UpdateTitleDto): Promise<Title | null> {
    await this.titlesRepository.update(id, updateTitleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.titlesRepository.delete(id);
    return result.affected === 1;
  }
}
