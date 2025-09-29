import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist)
    private watchlistRepository: Repository<Watchlist>,
  ) {}

  async create(createWatchlistDto: CreateWatchlistDto): Promise<Watchlist> {
    const item = this.watchlistRepository.create({
      ...createWatchlistDto,
      created_at: new Date(),
    });
    return this.watchlistRepository.save(item);
  }

  async findAll(): Promise<Watchlist[]> {
    return this.watchlistRepository.find();
  }

  async findOne(user_id: number, title_id: number): Promise<Watchlist | null> {
    return this.watchlistRepository.findOneBy({ user_id, title_id });
  }

  async update(user_id: number, title_id: number, updateWatchlistDto: UpdateWatchlistDto): Promise<Watchlist | null> {
    await this.watchlistRepository.update({ user_id, title_id }, updateWatchlistDto);
    return this.findOne(user_id, title_id);
  }

  async remove(user_id: number, title_id: number): Promise<boolean> {
    const result = await this.watchlistRepository.delete({ user_id, title_id });
    return result.affected === 1;
  }
}
