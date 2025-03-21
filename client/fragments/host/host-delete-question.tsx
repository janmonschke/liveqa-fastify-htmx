import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { isQaAdmin } from "../../guards/is-qa-admin.server";
import { RouteProps } from "../../../types";
import { db } from "../../db.server";
import { ensureAuthenticated } from "../../jwt.server";
import {
  emitQaChangedEvent,
  qaQuestionChangedEventName,
} from "../../../events.server";
import { qaTopicChangedEventName } from "../../../events";

export const path = "/qa/admin/:qaId/question/:questionId/delete";
export const method = "post";

export const preHandler: preHandlerAsyncHookHandler[] = [
  ensureAuthenticated,
  isQaAdmin,
];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
  questionId: Type.String({ minLength: 1 }),
});

const body = Type.Object({
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
  const { qaId, questionId } = req.params;
  await db.question.delete({
    where: {
      id: questionId,
    },
  });
  emitQaChangedEvent(qaId, qaTopicChangedEventName(req.body.topicId));
  return "";
}
