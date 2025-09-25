import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create rating' })
  @ApiResponse({ status: 201, type: Rating })
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ratings' })
  @ApiResponse({ status: 200, type: [Rating] })
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rating by id' })
  @ApiResponse({ status: 200, type: Rating })
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update rating' })
  @ApiResponse({ status: 200, type: Rating })
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete rating' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(+id);
  }
}
