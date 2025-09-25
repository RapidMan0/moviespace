import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TitlesModule } from './modules/titles/titles.module';
import { EpisodesModule } from './modules/episodes/episodes.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';

@Module({
  imports: [UsersModule, TitlesModule, EpisodesModule, RatingsModule, WatchlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
