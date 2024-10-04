-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('Offline', 'Online');

-- CreateTable
CREATE TABLE "Events" (
    "event_id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mode" "Mode" NOT NULL,
    "location" TEXT,
    "link" TEXT,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "_attendee-event-relation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_attendee-event-relation_AB_unique" ON "_attendee-event-relation"("A", "B");

-- CreateIndex
CREATE INDEX "_attendee-event-relation_B_index" ON "_attendee-event-relation"("B");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_attendee-event-relation" ADD CONSTRAINT "_attendee-event-relation_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_attendee-event-relation" ADD CONSTRAINT "_attendee-event-relation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
