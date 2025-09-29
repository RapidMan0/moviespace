import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private episodesRepository: Repository<Episode>,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    const episode = this.episodesRepository.create(createEpisodeDto);
    return this.episodesRepository.save(episode);
  }

  async findAll(): Promise<Episode[]> {
    return this.episodesRepository.find();
  }

  async findOne(id: number): Promise<Episode | null> {
    return this.episodesRepository.findOneBy({ id });
  }

  async update(id: number, updateEpisodeDto: UpdateEpisodeDto): Promise<Episode | null> {
    await this.episodesRepository.update(id, updateEpisodeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.episodesRepository.delete(id);
    return result.affected === 1;
  }
}