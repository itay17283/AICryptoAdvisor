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

  // -----------------------------
  // שמירה (אין stringify!)
  // -----------------------------
  async setPreferences(userId: number, data: any) {
    const existing = await this.repo.findOne({ where: { userId } });

    const toSave = {
      userId,
      cryptoAssets: data.cryptoAssets,   // כבר מערך
      investorType: data.investorType,
      contentTypes: data.contentTypes,   // כבר מערך
    };

    if (existing) {
      return this.repo.save({ ...existing, ...toSave });
    }

    const newPref = this.repo.create(toSave);
    return this.repo.save(newPref);
  }

  // -----------------------------
  // שליפה — אין JSON.parse!
  // TypeORM כבר מחזיר arrays
  // -----------------------------
  async getPreferences(userId: number) {
    return this.repo.findOne({ where: { userId } });
  }
}
