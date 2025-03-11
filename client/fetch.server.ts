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
            orderBy: [{ votes: { _count: "desc" } }, { createdAt: "asc" }],
            include: {
              votes: true,
            },
          },
        },
      },
    },
  });
}

export async function fetchQuestionsForTopic(topicId: string) {
  return db.question.findMany({
    where: {
      topicId,
    },
    orderBy: [{ votes: { _count: "desc" } }, { createdAt: "asc" }],
    include: {
      votes: true,
    },
  });
}
