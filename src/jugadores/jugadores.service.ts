import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateJugadoresDto } from './dto/create-jugadores.dto';
import { UpdateJugadoresDto } from './dto/update-jugadores.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as XLSX from 'xlsx';

@Injectable()
export class JugadoresService {

  constructor(private prismaService: PrismaService){}

  async create(createJugadoresDto: CreateJugadoresDto, imagen?: Express.Multer.File) {
    try {
      let imagenPath: string | undefined;

      if (imagen && imagen.buffer) {
        // Obtener información del equipo y serie si equipoId está presente
        let equipoNombre = 'sin_equipo';
        let serieNombre = 'sin_serie';

        if (createJugadoresDto.equipoId) {
          const equipo = await this.prismaService.equipos.findUnique({
            where: { id: createJugadoresDto.equipoId },
            include: { serie: true }
          });

          if (equipo) {
            equipoNombre = equipo.nombre.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
            if (equipo.serie) {
              serieNombre = equipo.serie.nombre.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
            }
          }
        }

        // Generar fecha de creación en formato YYYY/MM/DD
        const fechaCreacion = new Date().toISOString().split('T')[0].replace(/-/g, '/');

        // Sanitizar nombre del jugador
        const nombreJugador = createJugadoresDto.nombre.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');

        // Obtener extensión del archivo
        const extension = imagen.originalname.split('.').pop()?.toLowerCase() || 'jpg';

        // Generar nombre del archivo
        const filename = `${nombreJugador}-${equipoNombre}-${serieNombre}-${fechaCreacion}.${extension}`;

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

      return await this.prismaService.jugadores.create({
        data: {
          ...createJugadoresDto,
          imagen: imagenPath
        }
      });
    } catch (error) {
      console.error('Error creando jugador:', error);
      throw new HttpException(
        {
          error: 'ERR_001',
          message: 'Error interno del servidor al crear el jugador',
          details: 'Ocurrió un error inesperado durante la creación del jugador'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll() {
    const jugadores = await this.prismaService.jugadores.findMany({
      include: {
        equipo: {
          include: {
            serie: true
          }
        }
      }
    });
    return this.addImageUrls(jugadores);
  }

  async count() {
    return this.prismaService.jugadores.count();
  }

  async findAllWithDetails() {
    const jugadores = await this.prismaService.jugadores.findMany({
      orderBy: { createAt: 'desc' },
      include: {
        equipo: {
          include: {
            serie: true
          }
        }
      }
    });
    return this.addImageUrls(jugadores);
  }

  private addImageUrls(jugadores: any[]) {
    return jugadores.map(jugador => ({
      ...jugador,
      imagenUrl: jugador.imagen ? `${process.env.BASE_URL || 'http://localhost:4000'}/uploads/${jugador.imagen}` : null
    }));
  }

  async findOne(id: number) {
    const jugadorFound = await this.prismaService.jugadores.findUnique(
      {
        where: { id },
        include: {
          equipo: {
            include: {
              serie: true
            }
          }
        }
      }
    );

    if (!jugadorFound) {
      throw new NotFoundException(`Jugador con el id ${id}, no ha sido encontrado`);
    }
    return this.addImageUrls([jugadorFound])[0];
  }

  async update(id: number, updateJugadoresDto: UpdateJugadoresDto, imagen?: Express.Multer.File) {
    try {
      let imagenPath: string | undefined;

      if (imagen && imagen.buffer) {
        // Obtener información del jugador existente para generar el nombre del archivo
        const jugadorExistente = await this.prismaService.jugadores.findUnique({
          where: { id },
          include: {
            equipo: {
              include: {
                serie: true
              }
            }
          }
        });

        if (!jugadorExistente) {
          throw new NotFoundException(`Jugador con el id ${id}, no ha sido encontrado`);
        }

        let equipoNombre = 'sin_equipo';
        let serieNombre = 'sin_serie';

        if (jugadorExistente.equipo) {
          equipoNombre = jugadorExistente.equipo.nombre.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
          if (jugadorExistente.equipo.serie) {
            serieNombre = jugadorExistente.equipo.serie.nombre.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
          }
        }

        // Generar fecha de actualización en formato YYYY/MM/DD
        const fechaActualizacion = new Date().toISOString().split('T')[0].replace(/-/g, '/');

        // Sanitizar nombre del jugador
        const nombreJugador = (updateJugadoresDto.nombre || jugadorExistente.nombre).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');

        // Obtener extensión del archivo
        const extension = imagen.originalname.split('.').pop()?.toLowerCase() || 'jpg';

        // Generar nombre del archivo
        const filename = `${nombreJugador}-${equipoNombre}-${serieNombre}-${fechaActualizacion}.${extension}`;

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

      const dataToUpdate = { ...updateJugadoresDto };
      if (imagenPath) {
        dataToUpdate.imagen = imagenPath;
      }

      const jugadoractualizado = await this.prismaService.jugadores.update({
        where: { id },
        data: dataToUpdate
      });

      if (!jugadoractualizado) {
        throw new NotFoundException(`Jugador con el id ${id}, no ha sido Actualizado`);
      }
      return jugadoractualizado;
    } catch (error) {
      console.error('Error actualizando jugador:', error);
      throw new HttpException(
        {
          error: 'ERR_002',
          message: 'Error interno del servidor al actualizar el jugador',
          details: 'Ocurrió un error inesperado durante la actualización del jugador'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number) {
    const jugadorRemove = await this.prismaService.jugadores.delete({
      where:{id}
    })
    if (!jugadorRemove){
      throw new NotFoundException(`Jugador con el id ${id}, no ha sido Eliminado`);
    }
    return jugadorRemove;
  }

  async importFromExcel(buffer: Buffer) {
    try {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const requiredFields = ['Name', 'Birthdate', 'Height', 'Weight', 'Main position', 'Nationality', 'Rarity'];

      for (const row of data) {
        for (const field of requiredFields) {
          if (!(row as any)[field] || (row as any)[field] === '') {
            throw new Error('Archivo no válido');
          }
        }
      }

      const jugadores = data.map((row: any) => ({
        nombre: row['Name'],
        numeroCamiseta: '1', // Valor por defecto como string
        posicion: row['Main position'],
        fechaNacimiento: new Date(row['Birthdate']),
        nacionalidad: row['Nationality'],
        descripcion: '', // Valor por defecto
        estatura: parseFloat(row['Height']),
        peso: parseFloat(row['Weight']),
        posicionSecundaria1: row['Secondary position 1'] || null,
        posicionSecundaria2: row['Secondary position 2'] || null,
        rareza: row['Rarity'],
        equipoId: null, // Valor por defecto
      }));

      return this.prismaService.jugadores.createMany({ data: jugadores });
    } catch (error) {
      throw new Error('No se pudo cargar el archivo porque no cumple con los parámetros de carga');
    }
  }
}
