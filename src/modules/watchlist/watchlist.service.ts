import { Injectable } from '@nestjs/common';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { Watchlist } from './entities/watchlist.entity';

@Injectable()
export class WatchlistService {
  private watchlist: Watchlist[] = [];

  create(createWatchlistDto: CreateWatchlistDto): Watchlist {
    // Один title в watchlist пользователя
    if (this.watchlist.find(w => w.user_id === createWatchlistDto.user_id && w.title_id === createWatchlistDto.title_id)) {
      throw new Error('Title already in watchlist');
    }
    const item: Watchlist = {
      ...createWatchlistDto,
      created_at: new Date(),
    };
    this.watchlist.push(item);
    return item;
  }

  findAll(): Watchlist[] {
    return this.watchlist;
  }

  findOne(id: number): Watchlist | undefined {
    // id не используется, можно искать по user_id и title_id
    return this.watchlist[id];
  }

  update(id: number, updateWatchlistDto: UpdateWatchlistDto): Watchlist | undefined {
    // id не используется, обычно обновлять нечего
    return undefined;
  }

  remove(id: number): boolean {
    // id не используется, удалять по user_id и title_id
    if (id < 0 || id >= this.watchlist.length) return false;
    this.watchlist.splice(id, 1);
    return true;
  }
}
