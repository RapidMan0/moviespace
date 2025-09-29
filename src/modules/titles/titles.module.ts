import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitlesService } from './titles.service';
import { TitlesController } from './titles.controller';
import { Title } from './entities/title.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Title])],
  controllers: [TitlesController],
  providers: [TitlesService],
})
export class TitlesModule {}
