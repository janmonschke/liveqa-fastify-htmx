import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { Participant } from "@prisma/client";
import { Html } from "@kitajs/html";
import { Static, Type } from "@fastify/type-provider-typebox";
import { RouteProps } from "../../types";
import {
  extractParticipant,
  withParticipant,
} from "../guards/with-participant";
import "./data.client.ts";
import { db } from "../db.server";
import "./qa.client.ts";

export const path = "/qa/:qaId";
export const preHandler: preHandlerAsyncHookHandler[] = [withParticipant];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});

export const schema: FastifySchema = {
  params,
};

export const head = (
  <>
    <title>LiveQa</title>
  </>
);

export default async function ({
  req,
}: RouteProps<{ Params: Static<typeof params> }>) {
  const participant = extractParticipant(req);
  const { qaId } = req.params;

  const { qa, participantVotes } = await fetchQaDataForParticipant(
    qaId,
    participant
  );

  return (
    <section>
      <h1>{Html.escapeHtml(qa.title)}</h1>
      {qa.Topic.map((topic) => (
        <div style={{ marginBottom: "1rem" }}>
          <h3>{Html.escapeHtml(topic.title)}</h3>

          {/* <QuestionsAndForm
            qaId={qa.id}
            votingEnabled={Boolean(qa.QAConfig?.areVotesEnabled)}
            topic={topic.title}
            topicId={topic.id}
            participantId={participant.id}
            questions={topic.questions}
            participantVotes={participantVotes}
          /> */}
        </div>
      ))}
    </section>
  );
}

async function fetchQaDataForParticipant(
  qaId: string,
  participant: Participant
) {
  const qa = await db.qA.findFirstOrThrow({
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
              votes: {
                select: {
                  id: true,
                  questionId: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const participantVotes = (
    await db.vote.findMany({
      where: {
        participantId: participant.id,
      },
    })
  ).reduce((acc, curr) => {
    acc[curr.questionId] = true;
    return acc;
  }, {} as Record<string, boolean>);
  return { qa, participantVotes };
}
