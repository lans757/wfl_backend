# WFL Backend

## Descripción

API REST backend para el sistema de gestión de la World Football League (WFL), construida con NestJS. Proporciona endpoints para gestionar series, equipos, jugadores y autenticación de usuarios.

## Tecnologías Utilizadas

- **NestJS** - Framework de Node.js para aplicaciones backend
- **TypeScript** - JavaScript con tipado estático
- **Prisma** - ORM para base de datos
- **JWT** - Autenticación basada en tokens
- **Swagger** - Documentación de API
- **Multer** - Manejo de archivos
- **bcrypt** - Encriptación de contraseñas

## Requisitos Previos

- Node.js 18+
- pnpm (recomendado) o npm/yarn
- Base de datos PostgreSQL o compatible con Prisma

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd wfl_backend
```

2. Instala las dependencias:
```bash
pnpm install
```

3. Configura la base de datos en `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/wfl_db"
JWT_SECRET="tu-jwt-secret"
```

4. Ejecuta las migraciones de Prisma:
```bash
npx prisma migrate dev
```

## Ejecución en Desarrollo

```bash
pnpm start:dev
```

El servidor estará disponible en [http://localhost:4000](http://localhost:4000).

## Construcción para Producción

```bash
pnpm build
pnpm start:prod
```

## Documentación de API

La documentación Swagger está disponible en `/api` cuando el servidor está ejecutándose.

## Scripts Disponibles

- `pnpm start:dev` - Inicia el servidor en modo desarrollo con watch
- `pnpm start:prod` - Inicia el servidor en modo producción
- `pnpm build` - Construye la aplicación
- `pnpm test` - Ejecuta los tests
- `pnpm lint` - Ejecuta el linter
- `npx prisma studio` - Abre Prisma Studio para gestión de BD

## Estructura del Proyecto

```
src/
├── auth/           # Módulo de autenticación
├── series/         # Módulo de series
├── equipos/        # Módulo de equipos
├── jugadores/      # Módulo de jugadores
├── app.module.ts   # Módulo principal
└── main.ts         # Punto de entrada

prisma/
└── schema.prisma   # Esquema de base de datos
```

## Base de Datos

El proyecto utiliza Prisma como ORM. El esquema se encuentra en `prisma/schema.prisma`.

Para generar el cliente de Prisma después de cambios en el esquema:
```bash
npx prisma generate
```

## Variables de Entorno

- `DATABASE_URL`: URL de conexión a la base de datos
- `JWT_SECRET`: Clave secreta para JWT
- `PORT`: Puerto del servidor (por defecto 4000)

## Despliegue

Consulta el archivo `DEPLOYMENT.md` en el directorio raíz para instrucciones de despliegue.

## Error Codes Documentation

### ERR_001: Internal Server Error
- **Description**: Error interno del servidor al crear el jugador
- **Details**: Ocurrió un error inesperado durante la creación del jugador
- **HTTP Status**: 500 Internal Server Error

### ERR_002: Validation Error
- **Description**: Error de validación en los datos enviados
- **Details**: Los datos proporcionados no cumplen con los requisitos de validación
- **HTTP Status**: 400 Bad Request

### ERR_003: Database Connection Error
- **Description**: Error de conexión a la base de datos
- **Details**: No se pudo establecer conexión con la base de datos
- **HTTP Status**: 500 Internal Server Error

### ERR_004: File Upload Error
- **Description**: Error al subir archivo
- **Details**: Ocurrió un error durante la subida del archivo
- **HTTP Status**: 500 Internal Server Error

### ERR_005: Authentication Error
- **Description**: Error de autenticación
- **Details**: Token inválido o expirado
- **HTTP Status**: 401 Unauthorized

### ERR_006: Authorization Error
- **Description**: Error de autorización
- **Details**: No tienes permisos para realizar esta acción
- **HTTP Status**: 403 Forbidden

### ERR_007: Not Found Error
- **Description**: Recurso no encontrado
- **Details**: El recurso solicitado no existe
- **HTTP Status**: 404 Not Found

### ERR_008: Conflict Error
- **Description**: Conflicto de datos
- **Details**: Ya existe un registro con esos datos
- **HTTP Status**: 409 Conflict

### ERR_009: Bad Request
- **Description**: Solicitud incorrecta
- **Details**: Los parámetros de la solicitud son inválidos
- **HTTP Status**: 400 Bad Request

### ERR_010: Service Unavailable
- **Description**: Servicio no disponible
- **Details**: El servicio no está disponible temporalmente
- **HTTP Status**: 503 Service Unavailable
