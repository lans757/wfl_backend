import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SeriesService } from './series.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  create(@Body() createSerieDto: CreateSerieDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.seriesService.create(createSerieDto, imagen);
  }

  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  @Get('count')
  count() {
    return this.seriesService.count();
  }

  @Get('latest')
  findLatest() {
    return this.seriesService.findLatest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto) {
    return this.seriesService.update(+id, updateSerieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seriesService.remove(+id);
  }
}