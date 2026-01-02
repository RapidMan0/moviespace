import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RecommendationsService } from './recommendations.service';
import { Title } from '../titles/entities/title.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recs: RecommendationsService) {}

  @Get('trending')
  @ApiOperation({ summary: 'Trending titles (ratings count last 7 days)' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, type: [Title] })
  trending(@Query('limit') limit = '10') {
    return this.recs.getTrending(+limit);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Personalized recommendations for authenticated user' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, type: [Title] })
  recommendations(@Request() req, @Query('limit') limit = '10') {
    const userId = req.user.sub; // бери id из токена
    return this.recs.getRecommendations(userId, +limit);
  }
}
