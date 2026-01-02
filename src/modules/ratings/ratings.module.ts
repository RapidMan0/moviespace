import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Rating } from './entities/rating.entity';
import { Title } from '../titles/entities/title.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Title])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
