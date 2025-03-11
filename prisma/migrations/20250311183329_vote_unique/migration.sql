/*
  Warnings:

  - A unique constraint covering the columns `[participantId,questionId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_participantId_questionId_key" ON "Vote"("participantId", "questionId");
