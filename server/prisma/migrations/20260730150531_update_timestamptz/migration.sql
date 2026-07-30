/*
  Warnings:

  - You are about to drop the column `updated_at` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event_dates" ALTER COLUMN "starts_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "ends_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "events" DROP COLUMN "updated_at",
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "rsvps" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);
