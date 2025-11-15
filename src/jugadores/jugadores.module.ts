import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { JugadoresService } from './jugadores.service';
import { JugadoresController } from './jugadores.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [MulterModule.register({ dest: './uploads' })],
  controllers: [JugadoresController],
  providers: [JugadoresService, PrismaService],
})
export class JugadoresModule {}
