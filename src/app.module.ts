import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TitlesModule } from './modules/titles/titles.module';
import { EpisodesModule } from './modules/episodes/episodes.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { AuthModule } from './modules/auth/auth.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'user228',
      database: 'examproga',
      autoLoadEntities: true,
      synchronize: false, // Только для разработки!
    }),
    UsersModule,
    TitlesModule,
    EpisodesModule,
    RatingsModule,
    WatchlistModule,
    AuthModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
