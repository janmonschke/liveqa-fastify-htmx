import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { isQaAdmin } from "../../guards/is-qa-admin";
import { RouteProps } from "../../../types";
import { db } from "../../db.server";
import { ensureAuthenticated } from "../../jwt.server";
import {
  emitQaChangedEvent,
  qaConfigChangedEventName,
} from "../../../events.server";

export const path = "/qa/admin/:qaId/topic/delete";
export const method = "post";

export const preHandler: preHandlerAsyncHookHandler[] = [
  ensureAuthenticated,
  isQaAdmin,
];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
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
  const { qaId } = req.params;
  await db.topic.delete({
    where: {
      id: req.body.topicId,
      qaId,
    },
  });
  console.log("todo emit change");
  emitQaChangedEvent(qaId, qaConfigChangedEventName(qaId));
  return "";
}
