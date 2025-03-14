import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { RouteProps } from "../../../types";
import {
  extractParticipant,
  withParticipant,
} from "../../guards/with-participant";
import { db } from "../../db.server";
import {
  emitQaChangedEvent,
  qaTopicChangedEventName,
} from "../../../events.server";

export const path = `/qa/:qaId/add-vote`;
export const method = "post";
export const preHandler: preHandlerAsyncHookHandler[] = [withParticipant];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});
const body = Type.Object({
  topicId: Type.String(),
  questionId: Type.String(),
});

export const schema: FastifySchema = {
  params,
  body,
};

export default async function ({
  req,
}: RouteProps<{
  Params: Static<typeof params>;
  Body: Static<typeof body>;
}>) {
  const { qaId } = req.params;
  const { topicId, questionId } = req.body;
  const participant = extractParticipant(req);

  await db.vote.upsert({
    where: {
      participantId_questionId: {
        questionId,
        participantId: participant.id,
      },
    },
    create: {
      questionId,
      participantId: participant.id,
    },
    update: {},
  });

  emitQaChangedEvent(qaId, qaTopicChangedEventName(topicId));
  return "";
}
