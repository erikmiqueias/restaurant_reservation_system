/*
  Warnings:

  - The values [CANCELLED] on the enum `ReservationStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `guestCount` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReservationStatus_new" AS ENUM ('ACTIVE', 'CANCELED', 'COMPLETED');
ALTER TABLE "public"."Reservation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Reservation" ALTER COLUMN "status" TYPE "ReservationStatus_new" USING ("status"::text::"ReservationStatus_new");
ALTER TYPE "ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "public"."ReservationStatus_old";
ALTER TABLE "Reservation" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "guestCount" INTEGER NOT NULL;
