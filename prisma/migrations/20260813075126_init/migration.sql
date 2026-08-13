-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `position` ENUM('SHAREHOLDER', 'DIRECTOR', 'SECRETARY') NULL,
    `role` ENUM('ADMIN', 'SHAREHOLDER') NOT NULL DEFAULT 'SHAREHOLDER',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `registrationReturnReason` VARCHAR(191) NULL,
    `registrationReturnedAt` DATETIME(3) NULL,
    `resetToken` VARCHAR(191) NULL,
    `resetTokenExpiry` DATETIME(3) NULL,
    `notificationsSeenAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `staffRoleId` INTEGER NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StaffRole_name_key`(`name`),
    UNIQUE INDEX `StaffRole_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PermissionModule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `PermissionModule_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffRolePermission` (
    `staffRoleId` INTEGER NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `create` BOOLEAN NOT NULL DEFAULT false,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `update` BOOLEAN NOT NULL DEFAULT false,
    `delete` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`staffRoleId`, `moduleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BeneficiaryRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requestNo` VARCHAR(191) NOT NULL,
    `certificateNo` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,
    `status` ENUM('DRAFT', 'PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'RETURNED', 'UPDATE_REQUESTED') NOT NULL DEFAULT 'PENDING',
    `type` VARCHAR(191) NOT NULL DEFAULT 'Add Beneficiary Owner',
    `companyNameKh` VARCHAR(191) NULL,
    `companyNameEn` VARCHAR(191) NOT NULL,
    `registrationNo` VARCHAR(191) NOT NULL,
    `registrationDate` DATETIME(3) NOT NULL,
    `companyProvince` VARCHAR(191) NOT NULL,
    `companyDistrict` VARCHAR(191) NOT NULL,
    `companyCommune` VARCHAR(191) NOT NULL,
    `companyVillage` VARCHAR(191) NOT NULL,
    `companyStreet` VARCHAR(191) NOT NULL,
    `companyHouse` VARCHAR(191) NOT NULL,
    `companyPhone` VARCHAR(191) NOT NULL,
    `companyOfficePhone` VARCHAR(191) NULL,
    `companyEmail` VARCHAR(191) NOT NULL,
    `shLastNameKh` VARCHAR(191) NULL,
    `shFirstNameKh` VARCHAR(191) NULL,
    `shLastNameEn` VARCHAR(191) NOT NULL,
    `shFirstNameEn` VARCHAR(191) NOT NULL,
    `shDob` DATETIME(3) NOT NULL,
    `shBecameDate` DATETIME(3) NOT NULL,
    `shNationality` VARCHAR(191) NOT NULL,
    `shGender` ENUM('M', 'F') NOT NULL,
    `shIdCard` VARCHAR(191) NULL,
    `shIdIssuedDate` DATETIME(3) NULL,
    `shIdExpiredDate` DATETIME(3) NULL,
    `shEmail` VARCHAR(191) NULL,
    `shPhone` VARCHAR(191) NULL,
    `shPhotoName` VARCHAR(191) NULL,
    `shIdDocNames` VARCHAR(191) NOT NULL DEFAULT '[]',
    `ownerLastNameKh` VARCHAR(191) NULL,
    `ownerFirstNameKh` VARCHAR(191) NULL,
    `ownerLastNameEn` VARCHAR(191) NOT NULL,
    `ownerFirstNameEn` VARCHAR(191) NOT NULL,
    `ownerDob` DATETIME(3) NOT NULL,
    `ownerBecameDate` DATETIME(3) NOT NULL,
    `ownerNationality` VARCHAR(191) NOT NULL,
    `ownerGender` ENUM('M', 'F') NOT NULL,
    `ownerIdCard` VARCHAR(191) NULL,
    `ownerIdIssuedDate` DATETIME(3) NULL,
    `ownerIdExpiredDate` DATETIME(3) NULL,
    `ownerEmail` VARCHAR(191) NULL,
    `ownerPhone` VARCHAR(191) NULL,
    `ownerPhotoName` VARCHAR(191) NULL,
    `ownerIdDocNames` VARCHAR(191) NOT NULL DEFAULT '[]',
    `shareAmount` VARCHAR(191) NOT NULL,
    `shareholderContractDocNames` VARCHAR(191) NOT NULL DEFAULT '[]',
    `otherDocNames` VARCHAR(191) NOT NULL DEFAULT '[]',
    `consentAgreed` BOOLEAN NOT NULL DEFAULT false,
    `rejectionReason` VARCHAR(191) NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BeneficiaryRequest_requestNo_key`(`requestNo`),
    UNIQUE INDEX `BeneficiaryRequest_certificateNo_key`(`certificateNo`),
    INDEX `BeneficiaryRequest_userId_idx`(`userId`),
    INDEX `BeneficiaryRequest_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RequestLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requestId` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `actorUserId` INTEGER NOT NULL,
    `actorRole` ENUM('ADMIN', 'SHAREHOLDER') NOT NULL,
    `actorName` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RequestLog_requestId_idx`(`requestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RequestRevision` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requestId` INTEGER NOT NULL,
    `editedByUserId` INTEGER NOT NULL,
    `editedByRole` ENUM('ADMIN', 'SHAREHOLDER') NOT NULL,
    `editedByName` VARCHAR(191) NOT NULL,
    `previousData` VARCHAR(191) NOT NULL,
    `newData` VARCHAR(191) NOT NULL,
    `approvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RequestRevision_requestId_idx`(`requestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(191) NULL,
    `entityId` INTEGER NULL,
    `actorUserId` INTEGER NULL,
    `actorRole` ENUM('ADMIN', 'SHAREHOLDER') NULL,
    `actorName` VARCHAR(191) NULL,
    `note` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ActivityLog_createdAt_idx`(`createdAt`),
    INDEX `ActivityLog_actorUserId_idx`(`actorUserId`),
    INDEX `ActivityLog_action_idx`(`action`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_staffRoleId_fkey` FOREIGN KEY (`staffRoleId`) REFERENCES `StaffRole`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffRolePermission` ADD CONSTRAINT `StaffRolePermission_staffRoleId_fkey` FOREIGN KEY (`staffRoleId`) REFERENCES `StaffRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffRolePermission` ADD CONSTRAINT `StaffRolePermission_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `PermissionModule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BeneficiaryRequest` ADD CONSTRAINT `BeneficiaryRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequestLog` ADD CONSTRAINT `RequestLog_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `BeneficiaryRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequestRevision` ADD CONSTRAINT `RequestRevision_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `BeneficiaryRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
