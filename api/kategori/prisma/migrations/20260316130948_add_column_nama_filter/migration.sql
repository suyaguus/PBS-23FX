/*
  Warnings:

  - Made the column `nama_filter` on table `Kategori` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Kategori" ALTER COLUMN "nama_filter" SET NOT NULL;
