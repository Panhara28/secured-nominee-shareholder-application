-- AlterTable
ALTER TABLE "BeneficiaryRequest" ADD COLUMN "certificateNo" TEXT;
ALTER TABLE "BeneficiaryRequest" ADD COLUMN "approvedAt" DATETIME;

-- CreateIndex
CREATE UNIQUE INDEX "BeneficiaryRequest_certificateNo_key" ON "BeneficiaryRequest"("certificateNo");
