import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

import { CoinGeckoService } from '../external/coingecko.service';
import { CryptoPanicService } from '../external/cryptopanic.service';
import { AIService } from '../external/ai.service';
import { MemesService } from '../external/memes.service';

import { PreferencesModule } from '../preferences/preferences.module';

@Module({
  imports: [PreferencesModule],   // ← חובה!
  controllers: [DashboardController],
  providers: [
    DashboardService,
    CoinGeckoService,
    CryptoPanicService,
    AIService,
    MemesService,
  ],
})
export class DashboardModule {}
