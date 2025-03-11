import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { RouteProps } from "../../../types";
import {
  extractParticipant,
  withParticipant,
} from "../../guards/with-participant";
import { db } from "../../db.server";
import { emitQaChangedEvent, qaTopicChangedEventName } from "../../../events";

export const path = `/qa/:qaId/delete-vote`;
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

  await db.vote.deleteMany({
    where: {
      questionId,
      participantId: participant.id,
    },
  });

  emitQaChangedEvent(qaId, qaTopicChangedEventName(topicId));
  return "";
}
