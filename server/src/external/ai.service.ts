import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIService {
  private readonly apiKey: string;
  
  private cachedInsight: string | null = null;
  private cachedAt: number | null = null;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get<string>('OPENROUTER_API_KEY') ?? '';
  }

  async getInsight(prompt: string): Promise<string> {
    //cashe available for one day
    const ONE_DAY = 24 * 60 * 60 * 1000;

    // if there is cashe- return it 
    if (this.cachedInsight && this.cachedAt && (Date.now() - this.cachedAt < ONE_DAY)) {
      return this.cachedInsight;
    }

    //if there is no cache- call for OpenRouter
    try {
      const url = 'https://openrouter.ai/api/v1/chat/completions';

      const res = await axios.post(
        url,
        {
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a crypto market analysis expert." },
            { role: "user", content: prompt }
          ],
        },
        {
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      const insight = res.data.choices?.[0]?.message?.content ?? "AI error: no content";

      //save cache
      this.cachedInsight = insight;
      this.cachedAt = Date.now();

      return insight;

    } catch (e) {
      console.log("AI ERROR:", e.response?.data || e.message);
      return "AI API not available — using fallback insight.";
    }
  }
}
