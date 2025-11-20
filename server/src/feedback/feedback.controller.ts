import { Controller, Post, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addFeedback(@Body() body: any, @Req() req: any) {
    const userId = req.user.userId;
    const { section, vote } = body;

    return this.feedbackService.addFeedback(userId, section, vote);
  }

  @Get(':section')
  async getFeedback(@Param('section') section: string) {
    return this.feedbackService.getFeedbackSummary(section);
  }
}
