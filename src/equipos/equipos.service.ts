import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquiposService {

  constructor(private prismaService: PrismaService){}

  private addImageUrls(equipos: any[]) {
    return equipos.map(equipo => ({
      ...equipo,
      imagenUrl: equipo.imagen ? `${process.env.BASE_URL || 'http://localhost:4000'}/uploads/${equipo.imagen}` : null
    }));
  }

  async create(createEquipoDto: CreateEquipoDto, imagen?: Express.Multer.File) {
    let imagenPath: string | undefined;

    if (imagen && imagen.buffer) {
      // Generar fecha de creación en formato YYYY/MM/DD
      const fechaCreacion = new Date().toISOString().split('T')[0].replace(/-/g, '/');

      // Sanitizar nombre del equipo
      const nombreEquipo = createEquipoDto.nombre.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');

      // Obtener extensión del archivo
      const extension = imagen.originalname.split('.').pop()?.toLowerCase() || 'jpg';

      // Generar nombre del archivo
      const filename = `equipo-${nombreEquipo}-${fechaCreacion}.${extension}`;

      // Guardar la imagen en el directorio de uploads
      const fs = require('fs');
      const path = require('path');
      const uploadDir = path.join(__dirname, '../../uploads');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, imagen.buffer);

      imagenPath = `/uploads/${filename}`;
    }

    const { serieId, ...equipoData } = createEquipoDto;
    const equipo = await this.prismaService.equipos.create({
      data: {
        ...equipoData,
        imagen: imagenPath,
        ...(serieId && { serieId })
      },
      include: { serie: true, jugadores: true }
    });

    return this.addImageUrls([equipo])[0];
  }

  async findAll() {
    const equipos = await this.prismaService.equipos.findMany({
      include: { jugadores: true }
    });
    return this.addImageUrls(equipos);
  }

  async count() {
    return this.prismaService.equipos.count();
  }

  findAllWithSeries() {
    return this.prismaService.equipos.findMany({
      include: {
        serie: true,
        jugadores: true
      }
    });
  }

  async findOne(id: number) {
    const equipoFound = await this.prismaService.equipos.findUnique({
      where: { id },
      include: { jugadores: true, serie: true }
    });

    if (!equipoFound) {
      throw new NotFoundException(`Equipo con el id ${id}, no ha sido encontrado`);
    }
    return equipoFound;
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto) {
    const equipoActualizado = await this.prismaService.equipos.update({
      where: { id },
      data: updateEquipoDto,
      include: { jugadores: true, serie: true }
    });

    if (!equipoActualizado) {
      throw new NotFoundException(`Equipo con el id ${id}, no ha sido Actualizado`);
    }

    return equipoActualizado;
  }

  async remove(id: number) {
    // Set equipoId to null for players in this equipo
    await this.prismaService.jugadores.updateMany({
      where: { equipoId: id },
      data: { equipoId: null }
    });

    const equipoRemove = await this.prismaService.equipos.delete({
      where: { id }
    });

    if (!equipoRemove) {
      throw new NotFoundException(`Equipo con el id ${id}, no ha sido Eliminado`);
    }

    return equipoRemove;
  }
}