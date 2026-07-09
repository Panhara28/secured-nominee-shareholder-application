-- CreateTable
CREATE TABLE "BeneficiaryRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requestNo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "type" TEXT NOT NULL DEFAULT 'Add Beneficiary Owner',
    "companyNameKh" TEXT,
    "companyNameEn" TEXT NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "registrationDate" DATETIME NOT NULL,
    "companyProvince" TEXT NOT NULL,
    "companyDistrict" TEXT NOT NULL,
    "companyCommune" TEXT NOT NULL,
    "companyVillage" TEXT NOT NULL,
    "companyStreet" TEXT NOT NULL,
    "companyHouse" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "companyOfficePhone" TEXT,
    "companyEmail" TEXT NOT NULL,
    "shLastNameKh" TEXT,
    "shFirstNameKh" TEXT,
    "shLastNameEn" TEXT NOT NULL,
    "shFirstNameEn" TEXT NOT NULL,
    "shDob" DATETIME NOT NULL,
    "shNationality" TEXT NOT NULL,
    "shGender" TEXT NOT NULL,
    "shIdCard" TEXT,
    "shIdIssuedDate" DATETIME,
    "shIdExpiredDate" DATETIME,
    "shEmail" TEXT,
    "shPhone" TEXT,
    "shPhotoName" TEXT,
    "shIdDocNames" TEXT NOT NULL DEFAULT '[]',
    "ownerLastNameKh" TEXT,
    "ownerFirstNameKh" TEXT,
    "ownerLastNameEn" TEXT NOT NULL,
    "ownerFirstNameEn" TEXT NOT NULL,
    "ownerDob" DATETIME NOT NULL,
    "ownerNationality" TEXT NOT NULL,
    "ownerGender" TEXT NOT NULL,
    "ownerIdCard" TEXT,
    "ownerIdIssuedDate" DATETIME,
    "ownerIdExpiredDate" DATETIME,
    "ownerEmail" TEXT,
    "ownerPhone" TEXT,
    "ownerPhotoName" TEXT,
    "ownerIdDocNames" TEXT NOT NULL DEFAULT '[]',
    "shareAmount" TEXT NOT NULL,
    "shareholderContractDocNames" TEXT NOT NULL DEFAULT '[]',
    "otherDocNames" TEXT NOT NULL DEFAULT '[]',
    "consentAgreed" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BeneficiaryRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BeneficiaryRequest_requestNo_key" ON "BeneficiaryRequest"("requestNo");

-- CreateIndex
CREATE INDEX "BeneficiaryRequest_userId_idx" ON "BeneficiaryRequest"("userId");

-- CreateIndex
CREATE INDEX "BeneficiaryRequest_status_idx" ON "BeneficiaryRequest"("status");
