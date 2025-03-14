import { Html } from "@kitajs/html";
import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { isQaAdmin } from "../../guards/is-qa-admin";
import { RouteProps } from "../../../types";
import { db } from "../../db.server";
import { ensureAuthenticated } from "../../jwt.server";
import { HostQaTopicsList } from "../../components/host/HostQaTopicsList";
import { fetchQaWithTopicsAndQuestions } from "../../fetch.server";
import {
  emitQaChangedEvent,
  qaConfigChangedEventName,
} from "../../../events.server";

export const path = "/qa/admin/:qaId/topic/swap";
export const method = "post";

export const preHandler: preHandlerAsyncHookHandler[] = [
  ensureAuthenticated,
  isQaAdmin,
];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});
const body = Type.Object({
  topicAId: Type.String(),
  topicBId: Type.String(),
  newPositionA: Type.Number(),
  newPositionB: Type.Number(),
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
  const { topicAId, topicBId, newPositionA, newPositionB } = req.body;
  await db.$transaction([
    db.topic.update({
      where: {
        id: topicAId,
        qaId,
      },
      data: {
        order: newPositionA,
      },
    }),
    db.topic.update({
      where: {
        id: topicBId,
        qaId,
      },
      data: {
        order: newPositionB,
      },
    }),
  ]);
  emitQaChangedEvent(qaId, qaConfigChangedEventName(qaId));
  const qa = await fetchQaWithTopicsAndQuestions(qaId);
  return <HostQaTopicsList topics={qa.Topic} />;
}
