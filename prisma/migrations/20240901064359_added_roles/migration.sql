-- CreateEnum
CREATE TYPE "RolesType" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "RolesType"[] DEFAULT ARRAY['USER']::"RolesType"[];
