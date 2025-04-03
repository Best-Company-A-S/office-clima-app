-- AlterTable
ALTER TABLE "SurveyResponse" ADD COLUMN     "comment" TEXT,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "answers" SET DEFAULT '{}';
