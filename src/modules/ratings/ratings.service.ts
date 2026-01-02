import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { Title } from '../titles/entities/title.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    @InjectRepository(Title)
    private titlesRepository: Repository<Title>,
  ) { }

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingsRepository.create({
      ...createRatingDto,
      created_at: new Date(),
    });
    const saved = await this.ratingsRepository.save(rating);
    await this.recalcTitlePopularity(saved.title_id);
    return saved;
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingsRepository.find();
  }

  async findOne(id: number): Promise<Rating | null> {
    return this.ratingsRepository.findOneBy({ id });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating | null> {
    await this.ratingsRepository.update(id, updateRatingDto);
    const updated = await this.findOne(id);
    if (updated) await this.recalcTitlePopularity(updated.title_id);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const existing = await this.findOne(id);
    const result = await this.ratingsRepository.delete(id);
    if (result.affected === 1 && existing) {
      await this.recalcTitlePopularity(existing.title_id);
      return true;
    }
    return false;
  }

  private async recalcTitlePopularity(titleId: number) {
    const raw = await this.ratingsRepository.createQueryBuilder('rating')
      .select('AVG(rating.score)', 'avg')
      .addSelect('COUNT(rating.id)', 'count')
      .where('rating.title_id = :titleId', { titleId })
      .getRawOne();

    const avg = raw?.avg ? parseFloat(raw.avg) : null;
    await this.titlesRepository.update(titleId, { popularity: avg });
  }
}