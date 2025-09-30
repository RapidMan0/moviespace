import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) { }

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingsRepository.create({
      ...createRatingDto,
      created_at: new Date(),
    });
    return this.ratingsRepository.save(rating);
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingsRepository.find();
  }

  async findOne(id: number): Promise<Rating | null> {
    return this.ratingsRepository.findOneBy({ id });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating | null> {
    await this.ratingsRepository.update(id, updateRatingDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.ratingsRepository.delete(id);
    return result.affected === 1;
  }
}