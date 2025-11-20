import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MemesService {
  async getMeme() {
    try {
      // Crypto subreddit
      const url = 'https://meme-api.com/gimme/CryptoCurrencyMemes';

      const response = await axios.get(url);

      return {
        title: response.data.title,
        image: response.data.url,
        postLink: response.data.postLink,
        subreddit: response.data.subreddit,
        author: response.data.author,
        ups: response.data.ups,
      };
    } catch (error) {
      console.log("Meme API error:", error.response?.data || error.message);
      return {
        title: "Fallback crypto meme",
        image: "https://i.imgur.com/jNNT4LE.jpeg",
      };
    }
  }
}
