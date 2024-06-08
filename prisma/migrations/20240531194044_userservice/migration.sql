-- AlterTable
ALTER TABLE `user` ADD COLUMN `forgotPasswordToken` VARCHAR(255) NULL,
    ADD COLUMN `forgotPasswordTokenExpiry` DATETIME(3) NULL,
    ADD COLUMN `verifyToken` VARCHAR(255) NULL,
    ADD COLUMN `verifyTokenExpiry` DATETIME(3) NULL,
    MODIFY `account_status` VARCHAR(191) NOT NULL DEFAULT '0';
