import { Injectable } from '@nestjs/common';
import { CoinGeckoService } from '../external/coingecko.service';
import { CryptoPanicService } from '../external/cryptopanic.service';
import { AIService } from '../external/ai.service';
import { MemesService } from '../external/memes.service';
import { PreferencesService } from '../preferences/preferences.service';

@Injectable()
export class DashboardService {
  constructor(
    private prices: CoinGeckoService,
    private news: CryptoPanicService,
    private ai: AIService,
    private memes: MemesService,
    private prefs: PreferencesService,
  ) {}

  async getDashboard(userId: number) {
    const userPrefs = await this.prefs.getPreferences(userId);

    if (!userPrefs) {
      return {
        message: 'No preferences found. Please complete onboarding.',
      };
    }

    const assets = JSON.parse(userPrefs.cryptoAssets);
    const contentTypes = JSON.parse(userPrefs.contentTypes);

    const response: any = {};

    if (contentTypes.includes('Prices'))
      response.prices = await this.prices.getPrices(assets);

    if (contentTypes.includes('News'))
      response.news = await this.news.getNews();

    if (contentTypes.includes('AI'))
      response.aiInsight = await this.ai.getInsight(
        `Analyze these assets: ${assets.join(', ')}`
      );

    if (contentTypes.includes('Fun'))
      response.meme = await this.memes.getMeme();

    return response;
  }

}
