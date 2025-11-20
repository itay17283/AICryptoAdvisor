import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoPanicService {
  private readonly token: string;

  constructor(private config: ConfigService) {
    this.token = this.config.get<string>('CRYPTOPANIC_TOKEN') ?? '';
    console.log("Loaded CryptoPanic token:", this.token);
  }

  async getNews() {
    try {
      const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${this.token}&public=true`;

      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'AICryptoAdvisor/1.0',
          'Accept': 'application/json'
        }
      });

      return res.data.results.map((item: any) => ({
        title: item.title,
        url: item.url,
        published_at: item.published_at,
        source: item.source?.title,
      }));
    } catch (e) {
      console.log("CryptoPanic ERROR:", e.response?.status, e.response?.data);
      return [
        { title: 'CryptoPanic API error, using fallback news #1' },
        { title: 'CryptoPanic API error, using fallback news #2' },
      ];
    }
  }
}
