import { Injectable } from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Title } from './entities/title.entity';

@Injectable()
export class TitlesService {
  private titles: Title[] = [];
  private id = 1;

  create(createTitleDto: CreateTitleDto): Title {
    const title: Title = {
      id: this.id++,
      ...createTitleDto,
      created_at: new Date(),
    };
    this.titles.push(title);
    return title;
  }

  findAll(): Title[] {
    return this.titles;
  }

  findOne(id: number): Title | undefined {
    return this.titles.find(t => t.id === id);
  }

  update(id: number, updateTitleDto: UpdateTitleDto): Title | undefined {
    const title = this.findOne(id);
    if (!title) return undefined;
    Object.assign(title, updateTitleDto);
    return title;
  }

  remove(id: number): boolean {
    const idx = this.titles.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.titles.splice(idx, 1);
    return true;
  }
}
