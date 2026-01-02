import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Title } from '../titles/entities/title.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { Watchlist } from '../watchlist/entities/watchlist.entity';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Title) private titlesRepo: Repository<Title>,
    @InjectRepository(Rating) private ratingsRepo: Repository<Rating>,
    @InjectRepository(Watchlist) private watchlistRepo: Repository<Watchlist>,
  ) {}

  async getTrending(limit = 10) {
    const rows: Array<{ title_id: number }> = await this.ratingsRepo.query(
      `SELECT title_id, COUNT(*) as cnt
       FROM "rating"
       WHERE created_at > NOW() - INTERVAL '7 days'
       GROUP BY title_id
       ORDER BY cnt DESC
       LIMIT $1`, [limit],
    );
    const ids = rows.map(r => r.title_id);
    if (!ids.length) return [];
    const titles = await this.titlesRepo.find({ where: { id: In(ids) } });
    const byId = new Map(titles.map(t => [t.id, t]));
    return ids.map(id => byId.get(id)).filter(Boolean);
  }

  async getRecommendations(userId: number, limit = 10) {
    const userRatings = await this.ratingsRepo.find({ where: { user_id: userId }, take: 50 });
    const ratedIds = userRatings.map(r => r.title_id);
    const watchlist = await this.watchlistRepo.find({ where: { user_id: userId } });
    const watchedIds = watchlist.map(w => w.title_id);
    const excluded = Array.from(new Set([...ratedIds, ...watchedIds]));

    const seedTitles = ratedIds.length ? await this.titlesRepo.find({ where: { id: In(ratedIds) } }) : [];
    const genreCount: Record<string, number> = {};
    seedTitles.forEach(t => {
      if (!t.genres) return;
      t.genres.split(',').map(g => g.trim().toLowerCase()).forEach(g => {
        if (g) genreCount[g] = (genreCount[g] || 0) + 1;
      });
    });
    const topGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]).slice(0, 3);

    let candidates = await this.titlesRepo.find();
    candidates = candidates.filter(t => !excluded.includes(t.id));
    if (topGenres.length) {
      candidates = candidates.filter(t => {
        if (!t.genres) return false;
        const gs = t.genres.split(',').map(g => g.trim().toLowerCase());
        return topGenres.some(g => gs.includes(g));
      });
    }
    candidates.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return candidates.slice(0, limit);
  }
}