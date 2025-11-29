# WFL Backend

![WFL Logo](../wfl/public/logos/LOGO_WFL.png)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0.0-2D3748)](https://www.prisma.io/)

## Descripción

API REST backend para el sistema de gestión de la Waifu Football League (WFL), construida con NestJS. Proporciona endpoints para gestionar series, equipos, jugadores y autenticación de usuarios.

## ✨ Características

- 🔐 **Autenticación JWT** - Sistema seguro con tokens JWT
- ⚽ **Gestión de series** - API completa para torneos y competiciones
- 👥 **Equipos y jugadores** - Endpoints para manejo de equipos y miembros
- 📚 **Documentación Swagger** - API documentada automáticamente
- 🗄️ **Base de datos Prisma** - ORM moderno con migraciones
- 📁 **Subida de archivos** - Soporte para archivos con Multer
- 🔒 **Encriptación** - Contraseñas seguras con bcrypt

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

La documentación Swagger está disponible en `/api/docs` cuando el servidor está ejecutándose. Incluye autenticación JWT, ejemplos de requests y responses, y documentación completa de todos los endpoints.

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

### Configuración para Desarrollo Local (SQLite)
```env
DATABASE_URL="file:./prisma/dev.db"
PORT=4000
JWT_SECRET="tu-clave-secreta-jwt-desarrollo-aqui"
BASE_URL="http://localhost:4000"
NODE_ENV=development
```

### Configuración para Producción (PostgreSQL)
```env
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/base_de_datos"
JWT_SECRET="tu-clave-secreta-jwt-produccion-muy-segura-aqui"
BASE_URL="https://tu-dominio.com"
NODE_ENV=production
```

**Variables disponibles:**
- `DATABASE_URL`: URL de conexión a la base de datos (SQLite para desarrollo, PostgreSQL para producción)
- `JWT_SECRET`: Clave secreta para JWT (debe ser diferente en desarrollo y producción)
- `PORT`: Puerto del servidor (por defecto 4000)
- `BASE_URL`: URL base de la aplicación
- `NODE_ENV`: Entorno de ejecución (development/production)

## Despliegue

Consulta el archivo `DEPLOYMENT.md` en el directorio raíz para instrucciones de despliegue.

## 📋 Documentación de Códigos de Error

Esta sección documenta todos los códigos de error que pueden ocurrir en la API de WFL. Cada error incluye descripción, detalles y código HTTP correspondiente.

### 🔐 Errores de Autenticación y Autorización

#### AUTH_001: Token JWT Inválido
- **Descripción**: El token JWT proporcionado no es válido
- **Detalles**: El token está malformado, corrupto o no sigue el formato JWT estándar
- **HTTP Status**: 401 Unauthorized
- **Solución**: Solicitar un nuevo token de acceso

#### AUTH_002: Token JWT Expirado
- **Descripción**: El token JWT ha expirado
- **Detalles**: El token ha superado su tiempo de vida útil (TTL)
- **HTTP Status**: 401 Unauthorized
- **Solución**: Refrescar el token o iniciar sesión nuevamente

#### AUTH_003: Credenciales Incorrectas
- **Descripción**: Email o contraseña incorrectos
- **Detalles**: Las credenciales proporcionadas no coinciden con ningún usuario registrado
- **HTTP Status**: 401 Unauthorized
- **Solución**: Verificar email y contraseña

#### AUTH_004: Usuario No Encontrado
- **Descripción**: El usuario no existe en el sistema
- **Detalles**: No se encontró un usuario con el email proporcionado
- **HTTP Status**: 404 Not Found
- **Solución**: Verificar que el email esté registrado

#### AUTH_005: Usuario Inactivo
- **Descripción**: La cuenta del usuario está desactivada
- **Detalles**: El usuario existe pero su cuenta está inactiva
- **HTTP Status**: 403 Forbidden
- **Solución**: Contactar al administrador del sistema

#### AUTH_006: Permisos Insuficientes
- **Descripción**: El usuario no tiene permisos para realizar esta acción
- **Detalles**: Se requiere rol de administrador para esta operación
- **HTTP Status**: 403 Forbidden
- **Solución**: Solicitar permisos de administrador

#### AUTH_007: Token de Refresh Inválido
- **Descripción**: El token de refresh proporcionado no es válido
- **Detalles**: El token de refresh está corrupto o ha sido revocado
- **HTTP Status**: 401 Unauthorized
- **Solución**: Iniciar sesión nuevamente

### 📝 Errores de Validación

#### VAL_001: Campo Requerido Faltante
- **Descripción**: Un campo obligatorio no fue proporcionado
- **Detalles**: Campos como `name`, `email`, `password` son requeridos
- **HTTP Status**: 400 Bad Request
- **Solución**: Proporcionar todos los campos requeridos

#### VAL_002: Formato de Email Inválido
- **Descripción**: El email proporcionado no tiene un formato válido
- **Detalles**: El email debe seguir el formato estándar (usuario@dominio.com)
- **HTTP Status**: 400 Bad Request
- **Solución**: Verificar el formato del email

#### VAL_003: Contraseña Muy Corta
- **Descripción**: La contraseña debe tener al menos 6 caracteres
- **Detalles**: Por seguridad, las contraseñas deben ser de al menos 6 caracteres
- **HTTP Status**: 400 Bad Request
- **Solución**: Usar una contraseña más segura

#### VAL_004: Nombre de Equipo Duplicado
- **Descripción**: Ya existe un equipo con ese nombre
- **Detalles**: Los nombres de equipos deben ser únicos en el sistema
- **HTTP Status**: 409 Conflict
- **Solución**: Elegir un nombre diferente para el equipo

#### VAL_005: Serie No Encontrada
- **Descripción**: La serie especificada no existe
- **Detalles**: El `seriesId` proporcionado no corresponde a ninguna serie
- **HTTP Status**: 404 Not Found
- **Solución**: Verificar que la serie existe antes de asignarla

#### VAL_006: Número de Camiseta Duplicado
- **Descripción**: Ya existe un jugador con ese número en el equipo
- **Detalles**: Los números de camiseta deben ser únicos dentro de cada equipo
- **HTTP Status**: 409 Conflict
- **Solución**: Elegir un número diferente

#### VAL_007: Edad del Jugador Inválida
- **Descripción**: La fecha de nacimiento resulta en una edad inválida
- **Detalles**: Los jugadores deben tener entre 16 y 50 años
- **HTTP Status**: 400 Bad Request
- **Solución**: Verificar la fecha de nacimiento

#### VAL_008: Archivo Muy Grande
- **Descripción**: El archivo subido excede el tamaño máximo permitido
- **Detalles**: Las imágenes deben ser menores a 5MB
- **HTTP Status**: 400 Bad Request
- **Solución**: Comprimir la imagen o usar una más pequeña

#### VAL_009: Tipo de Archivo No Permitido
- **Descripción**: El tipo de archivo no está permitido
- **Detalles**: Solo se permiten imágenes JPG, PNG, GIF y WebP
- **HTTP Status**: 400 Bad Request
- **Solución**: Usar un formato de imagen válido

### 🗄️ Errores de Base de Datos

#### DB_001: Error de Conexión a Base de Datos
- **Descripción**: No se pudo conectar a la base de datos
- **Detalles**: Problemas de red, credenciales incorrectas o servidor caído
- **HTTP Status**: 500 Internal Server Error
- **Solución**: Verificar configuración de base de datos

#### DB_002: Violación de Restricción Única
- **Descripción**: Se intentó crear un registro que viola una restricción única
- **Detalles**: Email duplicado, nombre de equipo duplicado, etc.
- **HTTP Status**: 409 Conflict
- **Solución**: Usar valores únicos

#### DB_003: Violación de Clave Foránea
- **Descripción**: Referencia a un registro que no existe
- **Detalles**: Intentar asignar un equipo a una serie inexistente
- **HTTP Status**: 400 Bad Request
- **Solución**: Verificar que las referencias existen

#### DB_004: Timeout de Base de Datos
- **Descripción**: La consulta tardó demasiado en ejecutarse
- **Detalles**: Consultas complejas o problemas de rendimiento
- **HTTP Status**: 504 Gateway Timeout
- **Solución**: Optimizar la consulta o contactar al administrador

### 📁 Errores de Archivos

#### FILE_001: Error al Subir Archivo
- **Descripción**: Falló la subida del archivo al servidor
- **Detalles**: Problemas de red, permisos o configuración del servidor
- **HTTP Status**: 500 Internal Server Error
- **Solución**: Intentar nuevamente o contactar soporte

#### FILE_002: Archivo Corrupto
- **Descripción**: El archivo subido está corrupto o dañado
- **Detalles**: El archivo no se puede procesar correctamente
- **HTTP Status**: 400 Bad Request
- **Solución**: Subir un archivo válido

#### FILE_003: Directorio de Upload No Existe
- **Descripción**: El directorio de uploads no está disponible
- **Detalles**: Problemas de configuración del servidor
- **HTTP Status**: 500 Internal Server Error
- **Solución**: Contactar al administrador del sistema

#### FILE_004: Error al Procesar Imagen
- **Descripción**: No se pudo procesar la imagen subida
- **Detalles**: Formato no soportado o imagen corrupta
- **HTTP Status**: 400 Bad Request
- **Solución**: Verificar que la imagen sea válida

### ⚽ Errores Específicos de WFL

#### WFL_001: Serie Sin Equipos
- **Descripción**: No se puede eliminar una serie que tiene equipos asignados
- **Detalles**: Las series con equipos no pueden ser eliminadas
- **HTTP Status**: 409 Conflict
- **Solución**: Reasignar o eliminar los equipos primero

#### WFL_002: Equipo Sin Jugadores
- **Descripción**: No se puede eliminar un equipo que tiene jugadores
- **Detalles**: Los equipos con jugadores no pueden ser eliminados
- **HTTP Status**: 409 Conflict
- **Solución**: Transferir o eliminar los jugadores primero

#### WFL_003: Límite de Jugadores Alcanzado
- **Descripción**: El equipo ya tiene el máximo de jugadores permitidos
- **Detalles**: Cada equipo puede tener máximo 25 jugadores
- **HTTP Status**: 409 Conflict
- **Solución**: Crear un nuevo equipo o remover jugadores

#### WFL_004: Temporada Activa
- **Descripción**: No se pueden modificar series en temporada activa
- **Detalles**: Las series activas no permiten cambios en configuración
- **HTTP Status**: 409 Conflict
- **Solución**: Esperar a que termine la temporada

#### WFL_005: Jugador en Partido Activo
- **Descripción**: No se puede modificar un jugador que está en un partido activo
- **Detalles**: Los jugadores en partidos no pueden ser editados
- **HTTP Status**: 409 Conflict
- **Solución**: Esperar a que termine el partido

### 🚨 Errores del Sistema

#### SYS_001: Error Interno del Servidor
- **Descripción**: Error inesperado en el servidor
- **Detalles**: Excepción no manejada o error de lógica
- **HTTP Status**: 500 Internal Server Error
- **Solución**: Contactar al equipo de desarrollo

#### SYS_002: Servicio No Disponible
- **Descripción**: El servicio está temporalmente fuera de línea
- **Detalles**: Mantenimiento, sobrecarga o problemas técnicos
- **HTTP Status**: 503 Service Unavailable
- **Solución**: Intentar nuevamente más tarde

#### SYS_003: Rate Limit Excedido
- **Descripción**: Demasiadas solicitudes en poco tiempo
- **Detalles**: Límite de API excedido para prevenir abuso
- **HTTP Status**: 429 Too Many Requests
- **Solución**: Esperar antes de hacer más solicitudes

#### SYS_004: Mantenimiento Programado
- **Descripción**: El sistema está en mantenimiento
- **Detalles**: Actualizaciones o mantenimiento preventivo
- **HTTP Status**: 503 Service Unavailable
- **Solución**: Revisar el sitio web para información de mantenimiento

### 📊 Códigos de Estado HTTP Comunes

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Solicitud exitosa |
| 201 | Created | Recurso creado exitosamente |
| 204 | No Content | Solicitud exitosa sin contenido de respuesta |
| 400 | Bad Request | Solicitud malformada o inválida |
| 401 | Unauthorized | Autenticación requerida |
| 403 | Forbidden | Permisos insuficientes |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto con el estado actual |
| 422 | Unprocessable Entity | Datos válidos pero no procesables |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Server Error | Error interno del servidor |
| 503 | Service Unavailable | Servicio no disponible |
| 504 | Gateway Timeout | Timeout de la solicitud |

### 🆘 Solución de Problemas

Si encuentras un error no documentado:

1. **Revisa los logs del servidor** para más detalles
2. **Verifica la documentación de la API** en `/api/docs`
3. **Abre un issue** en el repositorio con:
   - Código de error recibido
   - Endpoint que causó el error
   - Datos enviados (sin información sensible)
   - Headers de la solicitud
   - Respuesta completa del servidor

## 🤝 Únete al Equipo WFL

¡Bienvenido a la Waifu Football League! Si eres un apasionado del fútbol, las waifus o el desarrollo de software, ¡este proyecto es para ti! 💙⚽

### ¿Cómo contribuir?

¡Las contribuciones son más que bienvenidas! Únete a nuestra comunidad de desarrolladores y ayuda a construir la mejor liga de fútbol virtual. Aquí te explicamos cómo:

#### 🚀 Pasos para contribuir

1. **🍴 Forkea el proyecto**
   - Haz click en "Fork" en la esquina superior derecha de este repositorio
   - Clona tu fork localmente: `git clone https://github.com/lans757/wfl_backend`

2. **🌿 Crea tu rama de feature**
   ```bash
   git checkout -b feature/tu-super-feature
   # O para correcciones:
   git checkout -b fix/correccion-importante
   # O para mejoras visuales:
   git checkout -b ui/mejora-interfaz
   ```

3. **💾 Realiza tus cambios**
   - Sigue las mejores prácticas de código
   - Mantén commits descriptivos: `git commit -m 'feat: agregar sistema de estadísticas de jugadores'`
   - Asegúrate de que todo funciona correctamente

4. **📤 Sube tus cambios**
   ```bash
   git push origin feature/tu-super-feature
   ```

5. **🔄 Abre un Pull Request**
   - Ve a la pestaña "Pull Requests" en este repositorio
   - Haz click en "New Pull Request"
   - Describe detalladamente qué has implementado
   - ¡Menciona si has agregado nuevas waifus al proyecto! 😄

#### 🎯 Tipos de contribuciones que necesitamos

- **⚽ Nuevas funcionalidades**: Estadísticas de jugadores, torneos personalizados, modos de juego
- **🐛 Corrección de bugs**: Reporta y arregla cualquier problema que encuentres
- **🎨 Mejoras de UI/UX**: Haz que la interfaz sea más atractiva y fácil de usar
- **📚 Documentación**: Mejora las guías, agrega ejemplos, traduce documentación
- **🧪 Tests**: Agrega tests unitarios e integración para mayor estabilidad
- **🌍 Internacionalización**: Soporte para múltiples idiomas
- **🚀 Optimización**: Mejora el rendimiento y la velocidad de carga

#### 📋 Guías de contribución

**Código:**
- Sigue las convenciones de TypeScript y NestJS
- Usa ESLint y Prettier para mantener el código limpio
- Comenta tu código cuando sea necesario
- Mantén la consistencia con el estilo existente

**Commits:**
- Usa commits convencionales: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Mantén los commits pequeños y enfocados
- Describe qué has hecho, no cómo lo has hecho

**Pull Requests:**
- Describe claramente qué problema resuelve tu PR
- Incluye capturas de pantalla si has hecho cambios visuales
- Asegúrate de que todos los tests pasan
- Actualiza la documentación si es necesario

**Comunidad:**
- Sé respetuoso y constructivo en las revisiones de código
- Ayuda a otros contribuidores cuando puedas
- Comparte ideas y sugerencias en los issues

#### 🏆 Reconocimientos

¡Todos los contribuidores serán reconocidos en el proyecto! Los contribuidores destacados tendrán menciones especiales y podrán formar parte del "Equipo Técnico WFL".

#### ❓ ¿Tienes preguntas?

- Abre un [issue](https://github.com/lans757/wfl/issues) para preguntas generales
- Únete a nuestras discusiones en GitHub Discussions
- Revisa la documentación en los READMEs del proyecto

¡Gracias por contribuir a hacer de WFL la mejor liga de fútbol virtual! ⚽💙

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, abre un [issue](https://github.com/lans757/wfl/issues) en GitHub.

## 📋 Changelog - Actualizaciones Recientes

### v1.1.0 - Correcciones y Mejoras (2025-11-29)

#### 🐛 Correcciones Críticas
- **Campo de imagen unificado**: Cambiado consistentemente de `image` a `imagen` en todo el backend (schema Prisma, servicios, controladores)
- **Formularios frontend corregidos**: Los formularios de creación/edición de equipos ahora usan nombres de campos en inglés correctos
- **Validación de DTO mejorada**: Agregado decorador `@Transform` para conversión automática de `seriesId` de string a number
- **Manejo de errores de API**: Reemplazado `Promise.all` con llamadas individuales para evitar que un endpoint fallido bloquee toda la interfaz

#### 🎨 Mejoras en la Interfaz de Usuario
- **Imágenes reales en vistas**: Las tarjetas de series y equipos ahora muestran las imágenes subidas reales en lugar de íconos estáticos
- **Manejo de errores de imágenes**: Implementado fallback automático a íconos SVG cuando las imágenes fallan al cargar
- **URLs de imágenes corregidas**: Hardcodeado `localhost:4000` para asegurar construcción correcta de URLs de imágenes
- **Interfaces TypeScript actualizadas**: Agregado campo `imagen` a la interfaz `Equipo` en el frontend

#### 🔧 Mejoras Técnicas
- **Campos de imagen consistentes**: Unificado el uso de `imagen` en lugar de `image` en toda la aplicación
- **File upload mejorado**: Corregidos los interceptores de archivos para usar `imagen` consistentemente
- **Cliente Prisma regenerado**: Actualizado después de cambios en el schema
- **Validación de formularios**: Mejorada la validación en formularios de creación de equipos

#### 📱 Experiencia de Usuario
- **Vista de series mejorada**: Las tarjetas de series muestran imágenes reales con fallback elegante
- **Vista de equipos mejorada**: Los equipos en las vistas de series muestran sus imágenes subidas
- **Carga más robusta**: La interfaz no se bloquea si algunos endpoints fallan
- **Mensajes de error mejorados**: Mejor manejo de errores con logging detallado

#### 🗄️ Base de Datos
- **Schema Prisma actualizado**: Campo `image` → `imagen` en modelos Team, Serie, Player y User
- **Migraciones aplicadas**: Base de datos actualizada para reflejar cambios en el schema
- **Consistencia de datos**: Asegurada uniformidad en el manejo de campos de imagen

#### 🔒 Seguridad y Rendimiento
- **Manejo de archivos mejorado**: File upload más robusto con nombres de campos consistentes
- **Validación de entrada**: Mejorada la validación de datos en DTOs
- **Gestión de errores**: Mejor logging y manejo de errores en toda la aplicación

### Problemas Resueltos
- ✅ Error "Unexpected field - imagen" al crear series
- ✅ Formularios de equipos enviando campos en español al backend
- ✅ Imágenes no se mostraban en vistas de usuario
- ✅ `Promise.all` bloqueando la interfaz cuando un endpoint fallaba
- ✅ Inconsistencias entre campos `image`/`imagen` en el backend
- ✅ Validación incorrecta de `seriesId` en DTOs
- ✅ URLs de imágenes mal construidas en el frontend

### Compatibilidad
- **Backend**: NestJS 10.0.0, Prisma 5.0.0, TypeScript 5.0.0
- **Frontend**: Next.js con TypeScript, Axios para requests HTTP
- **Base de datos**: PostgreSQL/SQLite compatible con Prisma
- **Navegadores**: Soporte completo con fallback para imágenes
