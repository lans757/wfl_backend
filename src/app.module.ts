import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JugadoresModule } from './jugadores/jugadores.module';
import { EquiposModule } from './equipos/equipos.module';
import { SeriesModule } from './series/series.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    JugadoresModule,
    EquiposModule,
    SeriesModule,
    AuthModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
