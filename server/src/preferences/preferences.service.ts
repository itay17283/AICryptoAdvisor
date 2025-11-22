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
      return this.repo.save({ ...existing, ...data });
    }

    const newPref = this.repo.create({ userId, ...data });
    return this.repo.save(newPref);
  }

  async findByUserId(userId: number) {
    return this.repo.findOne({ where: { userId } });
  }

  async findAll() {
    return this.repo.find();
  }

  async getPreferences(userId: number) {
    return this.repo.findOne({ where: { userId } });
  }
}
