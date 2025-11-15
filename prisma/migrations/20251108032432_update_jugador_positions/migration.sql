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
