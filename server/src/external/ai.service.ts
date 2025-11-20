import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIService {
  private readonly apiKey: string;

  // Cache משתנים פנימיים:
  private cachedInsight: string | null = null;
  private cachedAt: number | null = null;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get<string>('OPENROUTER_API_KEY') ?? '';
  }

  async getInsight(prompt: string): Promise<string> {
    return "AI API not available — using fallback insight.";
    // const ONE_DAY = 24 * 60 * 60 * 1000;

    // // 1️⃣ אם יש cache פחות מיום — נחזיר אותו
    // if (this.cachedInsight && this.cachedAt && (Date.now() - this.cachedAt < ONE_DAY)) {
    //   return this.cachedInsight;
    // }

    // // 2️⃣ אם אין cache — נקרא ל-OpenRouter
    // try {
    //   const url = 'https://openrouter.ai/api/v1/chat/completions';

    //   const res = await axios.post(
    //     url,
    //     {
    //       model: "openai/gpt-4o-mini",
    //       messages: [
    //         { role: "system", content: "You are a crypto market analysis expert." },
    //         { role: "user", content: prompt }
    //       ],
    //     },
    //     {
    //       headers: {
    //         "Authorization": `Bearer ${this.apiKey}`,
    //         "Content-Type": "application/json"
    //       }
    //     }
    //   );

    //   const insight = res.data.choices?.[0]?.message?.content ?? "AI error: no content";

    //   // 3️⃣ שמירת cache
    //   this.cachedInsight = insight;
    //   this.cachedAt = Date.now();

    //   return insight;

    // } catch (e) {
    //   console.log("AI ERROR:", e.response?.data || e.message);
    //   return "AI API not available — using fallback insight.";
    // }
  }
}
