import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private repo: Repository<Feedback>,
  ) {}
  
  async addFeedback(userId: number, section: string, vote: number) {
    const existing = await this.repo.findOne({
      where: { userId, section },
    });

    if (existing) {
      if (existing.vote === vote) {
        return existing; // אין שינוי
      }

  
      existing.vote = vote;
      return this.repo.save(existing);
    }

    const fb = this.repo.create({
      userId,
      section,
      vote,
    });
    return this.repo.save(fb);
  }

  async getFeedbackSummary(section: string) {
    const all = await this.repo.find({
      where: { section },
    });

    const likes = all.filter((f) => f.vote === 1).length;
    const dislikes = all.filter((f) => f.vote === -1).length;

    return {
      likes,
      dislikes,
      total: all.length,
    };
  }
}
