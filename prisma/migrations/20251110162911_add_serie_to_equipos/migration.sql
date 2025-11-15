/*
  Warnings:

  - You are about to drop the `_equiposToseries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_equiposToseries_B_index";

-- DropIndex
DROP INDEX "_equiposToseries_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_equiposToseries";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_equipos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estadio" TEXT,
    "ciudad" TEXT,
    "serieId" INTEGER,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "equipos_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_equipos" ("ciudad", "createAt", "descripcion", "estadio", "id", "nombre", "updateAt") SELECT "ciudad", "createAt", "descripcion", "estadio", "id", "nombre", "updateAt" FROM "equipos";
DROP TABLE "equipos";
ALTER TABLE "new_equipos" RENAME TO "equipos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
