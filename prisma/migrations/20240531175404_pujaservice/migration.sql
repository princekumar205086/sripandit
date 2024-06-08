/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PujaCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PujaCategory_name_key` ON `PujaCategory`(`name`);
