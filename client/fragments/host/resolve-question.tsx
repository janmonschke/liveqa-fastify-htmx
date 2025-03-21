import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { isQaAdmin } from "../../guards/is-qa-admin.server";
import { RouteProps } from "../../../types";
import { db } from "../../db.server";
import { ensureAuthenticated } from "../../jwt.server";
import {
  emitQaChangedEvent,
  qaConfigChangedEventName,
} from "../../../events.server";
import { qaTopicChangedEventName } from "../../../events";

export const path = "/qa/admin/:qaId/question/:questionId/resolve";
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
  isResolved: Type.Optional(Type.String()),
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
  const { isResolved, topicId } = req.body;
  await db.question.update({
    where: {
      id: questionId,
    },
    data: {
      resolved: !!isResolved,
    },
  });
  emitQaChangedEvent(qaId, qaTopicChangedEventName(topicId));
  return "";
}
