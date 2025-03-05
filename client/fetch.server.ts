import { db } from "./db.server";

export async function fetchQaWithTopicsAndQuestions(qaId: string) {
  return await db.qA.findFirstOrThrow({
    where: {
      id: qaId,
    },
    include: {
      QAConfig: true,
      Topic: {
        orderBy: {
          order: "asc",
        },
        include: {
          questions: {
            include: {
              votes: true,
            },
          },
        },
      },
    },
  });
}
