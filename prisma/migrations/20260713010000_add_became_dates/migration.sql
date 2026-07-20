-- AlterTable
ALTER TABLE "BeneficiaryRequest" ADD COLUMN "shBecameDate" DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00';
ALTER TABLE "BeneficiaryRequest" ADD COLUMN "ownerBecameDate" DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00';

UPDATE "BeneficiaryRequest" SET "shBecameDate" = CURRENT_TIMESTAMP, "ownerBecameDate" = CURRENT_TIMESTAMP;
