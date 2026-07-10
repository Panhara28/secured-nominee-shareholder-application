-- CreateTable
CREATE TABLE "RequestRevision" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requestId" INTEGER NOT NULL,
    "editedByUserId" INTEGER NOT NULL,
    "editedByRole" TEXT NOT NULL,
    "editedByName" TEXT NOT NULL,
    "previousData" TEXT NOT NULL,
    "newData" TEXT NOT NULL,
    "approvedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RequestRevision_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "BeneficiaryRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "RequestRevision_requestId_idx" ON "RequestRevision"("requestId");
