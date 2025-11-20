import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CoinGeckoService {
  async getPrices(assets: string[]) {
    try {
      const map = {
        BTC: 'bitcoin',
        ETH: 'ethereum',
        SOL: 'solana',
      };

      const ids = assets
        .map((a) => map[a] || a.toLowerCase())
        .join(',');

      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      return {};
    }
  }

}
