import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { Watchlist } from './entities/watchlist.entity';

@ApiTags('watchlist')
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  @ApiOperation({ summary: 'Add to watchlist' })
  @ApiResponse({ status: 201, type: Watchlist })
  create(@Body() createWatchlistDto: CreateWatchlistDto) {
    return this.watchlistService.create(createWatchlistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all watchlist items' })
  @ApiResponse({ status: 200, type: [Watchlist] })
  findAll() {
    return this.watchlistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get watchlist item by id' })
  @ApiResponse({ status: 200, type: Watchlist })
  findOne(@Param('id') id: string) {
    return this.watchlistService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update watchlist item' })
  @ApiResponse({ status: 200, type: Watchlist })
  update(@Param('id') id: string, @Body() updateWatchlistDto: UpdateWatchlistDto) {
    return this.watchlistService.update(+id, updateWatchlistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove from watchlist' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    return this.watchlistService.remove(+id);
  }
}
