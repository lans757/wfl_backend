-- CreateTable
CREATE TABLE "series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "temporada" TEXT,
    "pais" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_equiposToseries" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_equiposToseries_A_fkey" FOREIGN KEY ("A") REFERENCES "equipos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_equiposToseries_B_fkey" FOREIGN KEY ("B") REFERENCES "series" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_equiposToseries_AB_unique" ON "_equiposToseries"("A", "B");

-- CreateIndex
CREATE INDEX "_equiposToseries_B_index" ON "_equiposToseries"("B");
