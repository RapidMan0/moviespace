import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { Title } from '../titles/entities/title.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { Watchlist } from '../watchlist/entities/watchlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Title, Rating, Watchlist])],
  providers: [RecommendationsService],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}