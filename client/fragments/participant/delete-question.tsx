import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { RouteProps } from "../../../types";
import { db } from "../../db.server";
import { emitQaChangedEvent, qaConfigChangedEventName } from "../../../events";
import {
  extractParticipant,
  withParticipant,
} from "../../guards/with-participant";

export const path = "/qa/:qaId/question/delete";
export const method = "post";

export const preHandler: preHandlerAsyncHookHandler[] = [withParticipant];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});
const body = Type.Object({
  questionId: Type.String(),
  topicId: Type.String(),
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
  const participant = extractParticipant(req);
  await db.question.delete({
    where: {
      id: req.body.questionId,
      topicId: req.body.topicId,
      participantId: participant.id,
    },
  });
  // emitQaChangedEvent(req.params.qaId, qaConfigChangedEventName(qaId));
  return "";
}
