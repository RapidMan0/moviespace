import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode } from './entities/episode.entity';

@ApiTags('episodes')
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  @ApiOperation({ summary: 'Create episode' })
  @ApiResponse({ status: 201, type: Episode })
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all episodes' })
  @ApiResponse({ status: 200, type: [Episode] })
  findAll() {
    return this.episodesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get episode by id' })
  @ApiResponse({ status: 200, type: Episode })
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update episode' })
  @ApiResponse({ status: 200, type: Episode })
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodesService.update(+id, updateEpisodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete episode' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    return this.episodesService.remove(+id);
  }
}
