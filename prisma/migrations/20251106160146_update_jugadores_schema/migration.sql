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
