-- Combined migrations for 'jugadores' model
-- This file contains all SQL migrations related to the 'jugadores' table concatenated in order.

-- Migration: 20251106160146_update_jugadores_schema
/*
  Warnings:

  - You are about to drop the column `description` on the `jugadores` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `jugadores` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `jugadores` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `jugadores` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `jugadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroCamiseta` to the `jugadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posicion` to the `jugadores` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_jugadores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "numeroCamiseta" INTEGER NOT NULL,
    "posicion" TEXT NOT NULL,
    "fechaNacimiento" DATETIME,
    "nacionalidad" TEXT,
    "descripcion" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_jugadores" ("createAt", "id", "updateAt") SELECT "createAt", "id", "updateAt" FROM "jugadores";
DROP TABLE "jugadores";
ALTER TABLE "new_jugadores" RENAME TO "jugadores";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- Migration: 20251107035256_add_jugador_fields
-- AlterTable
ALTER TABLE "jugadores" ADD COLUMN "estatura" REAL;
ALTER TABLE "jugadores" ADD COLUMN "peso" REAL;
ALTER TABLE "jugadores" ADD COLUMN "posicionesSecundarias" TEXT;
ALTER TABLE "jugadores" ADD COLUMN "rareza" TEXT;

-- Migration: 20251108032432_update_jugador_positions
/*
  Warnings:

  - You are about to drop the column `posicionesSecundarias` on the `jugadores` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_jugadores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "numeroCamiseta" INTEGER NOT NULL,
    "posicion" TEXT NOT NULL,
    "fechaNacimiento" DATETIME,
    "nacionalidad" TEXT,
    "descripcion" TEXT,
    "estatura" REAL,
    "peso" REAL,
    "posicionSecundaria1" TEXT,
    "posicionSecundaria2" TEXT,
    "rareza" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "equipoId" INTEGER,
    CONSTRAINT "jugadores_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "equipos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_jugadores" ("createAt", "descripcion", "equipoId", "estatura", "fechaNacimiento", "id", "nacionalidad", "nombre", "numeroCamiseta", "peso", "posicion", "rareza", "updateAt") SELECT "createAt", "descripcion", "equipoId", "estatura", "fechaNacimiento", "id", "nacionalidad", "nombre", "numeroCamiseta", "peso", "posicion", "rareza", "updateAt" FROM "jugadores";
DROP TABLE "jugadores";
ALTER TABLE "new_jugadores" RENAME TO "jugadores";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- Migration: 20251108173756_add_imagen_to_jugadores
-- AlterTable
ALTER TABLE "jugadores" ADD COLUMN "imagen" TEXT;

-- Migration: 20251108174551_change_numero_camiseta_to_string
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_jugadores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "numeroCamiseta" TEXT NOT NULL,
    "posicion" TEXT NOT NULL,
    "fechaNacimiento" DATETIME,
    "nacionalidad" TEXT,
    "descripcion" TEXT,
    "estatura" REAL,
    "peso" REAL,
    "posicionSecundaria1" TEXT,
    "posicionSecundaria2" TEXT,
    "rareza" TEXT,
    "imagen" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "equipoId" INTEGER,
    CONSTRAINT "jugadores_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "equipos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_jugadores" ("createAt", "descripcion", "equipoId", "estatura", "fechaNacimiento", "id", "imagen", "nacionalidad", "nombre", "numeroCamiseta", "peso", "posicion", "posicionSecundaria1", "posicionSecundaria2", "rareza", "updateAt") SELECT "createAt", "descripcion", "equipoId", "estatura", "fechaNacimiento", "id", "imagen", "nacionalidad", "nombre", "numeroCamiseta", "peso", "posicion", "posicionSecundaria1", "posicionSecundaria2", "rareza", "updateAt" FROM "jugadores";
DROP TABLE "jugadores";
ALTER TABLE "new_jugadores" RENAME TO "jugadores";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;