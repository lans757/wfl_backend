import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JugadoresService } from './jugadores.service';
import { CreateJugadoresDto } from './dto/create-jugadores.dto';
import type { UpdateJugadoresDto } from './dto/update-jugadores.dto';

@Controller('jugadores')
export class JugadoresController {
  constructor(private readonly jugadoresService: JugadoresService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  create(@Body() createJugadoresDto: CreateJugadoresDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.jugadoresService.create(createJugadoresDto, imagen);
  }

  @Get()
  findAll() {
    return this.jugadoresService.findAll();
  }

  @Get('count')
  count() {
    return this.jugadoresService.count();
  }

  @Get('with-details')
  findAllWithDetails() {
    return this.jugadoresService.findAllWithDetails();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jugadoresService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  update(@Param('id') id: string, @Body() updateJugadoresDto: UpdateJugadoresDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.jugadoresService.update(+id, updateJugadoresDto, imagen);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jugadoresService.remove(+id);
  }

  @Post('import-excel')
  @UseInterceptors(FileInterceptor('file'))
  async importFromExcel(@UploadedFile() file: Express.Multer.File) {
    return this.jugadoresService.importFromExcel(file.buffer);
  }
}
