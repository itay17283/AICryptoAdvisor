import { Controller, Post, Get, Body, UseGuards, Req, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PreferencesService } from './preferences.service';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  setPreferences(@Body() body: any, @Req() req: any) {
    const userId = req.user.userId;

    const { cryptoAssets, investorType, contentTypes } = body;

    return this.preferencesService.setPreferences(userId, {
      cryptoAssets: JSON.stringify(cryptoAssets),
      investorType,
      contentTypes: JSON.stringify(contentTypes),
    });
  }

  @Get()
  getAllPreferences() {
    return this.preferencesService.findAll();
  }

  @Get('userId/:id')
  getPreferencesByUserId(@Param('id') id: string) {
    return this.preferencesService.findByUserId(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyPreferences(@Req() req: any) {
    const userId = req.user.userId;
    return this.preferencesService.getPreferences(userId);
  }
  

}
