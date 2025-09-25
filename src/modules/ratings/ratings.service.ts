import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  private ratings: Rating[] = [];
  private id = 1;

  create(createRatingDto: CreateRatingDto): Rating {
    // Один рейтинг на пользователя и title
    if (this.ratings.find(r => r.user_id === createRatingDto.user_id && r.title_id === createRatingDto.title_id)) {
      throw new Error('User already rated this title');
    }
    const rating: Rating = {
      id: this.id++,
      ...createRatingDto,
      created_at: new Date(),
    };
    this.ratings.push(rating);
    return rating;
  }

  findAll(): Rating[] {
    return this.ratings;
  }

  findOne(id: number): Rating | undefined {
    return this.ratings.find(r => r.id === id);
  }

  update(id: number, updateRatingDto: UpdateRatingDto): Rating | undefined {
    const rating = this.findOne(id);
    if (!rating) return undefined;
    Object.assign(rating, updateRatingDto);
    return rating;
  }

  remove(id: number): boolean {
    const idx = this.ratings.findIndex(r => r.id === id);
    if (idx === -1) return false;
    this.ratings.splice(idx, 1);
    return true;
  }
}
