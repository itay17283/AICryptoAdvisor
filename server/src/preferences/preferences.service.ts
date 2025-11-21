import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Preferences } from './preferences.entity';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(Preferences)
    private repo: Repository<Preferences>,
  ) {}

  async setPreferences(userId: number, data: any) {
    const existing = await this.repo.findOne({ where: { userId } });

    if (existing) {
      // עדכון העדפות קיימות
      return this.repo.save({ ...existing, ...data });
    }

    // יצירת Preferences חדשים
    const newPref = this.repo.create({ userId, ...data });
    return this.repo.save(newPref);
  }

  async getPreferences(userId: number) {
    return this.repo.findOne({ where: { userId } });
  }
}
