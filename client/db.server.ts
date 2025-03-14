import { PrismaClient } from "@prisma/client";
import { remember } from "@epic-web/remember";

export const db = remember(
  "prisma",
  () =>
    new PrismaClient({
      log: [
        {
          emit: "event",
          level: "query",
        },
        {
          emit: "stdout",
          level: "error",
        },
        {
          emit: "stdout",
          level: "info",
        },
        {
          emit: "stdout",
          level: "warn",
        },
      ],
    })
);

db.$on("query", (e) => {
  console.log("Duration: " + e.duration + "ms");
});
