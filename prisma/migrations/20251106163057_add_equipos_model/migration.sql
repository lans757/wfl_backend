-- CreateTable
CREATE TABLE "equipos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "estadio" TEXT,
    "ciudad" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);

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
    "updateAt" DATETIME NOT NULL,
    "equipoId" INTEGER,
    CONSTRAINT "jugadores_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "equipos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_jugadores" ("createAt", "descripcion", "fechaNacimiento", "id", "nacionalidad", "nombre", "numeroCamiseta", "posicion", "updateAt") SELECT "createAt", "descripcion", "fechaNacimiento", "id", "nacionalidad", "nombre", "numeroCamiseta", "posicion", "updateAt" FROM "jugadores";
DROP TABLE "jugadores";
ALTER TABLE "new_jugadores" RENAME TO "jugadores";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
