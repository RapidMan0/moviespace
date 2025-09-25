import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode } from './entities/episode.entity';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];
  private id = 1;

  create(createEpisodeDto: CreateEpisodeDto): Episode {
    const episode: Episode = {
      id: this.id++,
      ...createEpisodeDto,
    };
    this.episodes.push(episode);
    return episode;
  }

  findAll(): Episode[] {
    return this.episodes;
  }

  findOne(id: number): Episode | undefined {
    return this.episodes.find(e => e.id === id);
  }

  update(id: number, updateEpisodeDto: UpdateEpisodeDto): Episode | undefined {
    const episode = this.findOne(id);
    if (!episode) return undefined;
    Object.assign(episode, updateEpisodeDto);
    return episode;
  }

  remove(id: number): boolean {
    const idx = this.episodes.findIndex(e => e.id === id);
    if (idx === -1) return false;
    this.episodes.splice(idx, 1);
    return true;
  }
}
