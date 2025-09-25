import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TitlesService } from './titles.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Title } from './entities/title.entity';

@ApiTags('titles')
@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create title' })
  @ApiResponse({ status: 201, type: Title })
  create(@Body() createTitleDto: CreateTitleDto) {
    return this.titlesService.create(createTitleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all titles' })
  @ApiResponse({ status: 200, type: [Title] })
  findAll() {
    return this.titlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get title by id' })
  @ApiResponse({ status: 200, type: Title })
  findOne(@Param('id') id: string) {
    return this.titlesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update title' })
  @ApiResponse({ status: 200, type: Title })
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titlesService.update(+id, updateTitleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete title' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    return this.titlesService.remove(+id);
  }
}
