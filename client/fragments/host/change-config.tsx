import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { isQaAdmin } from "../../guards/is-qa-admin.server";
import { RouteProps } from "../../../types";
import { db } from "../../db.server";
import QaConfigForm from "../../components/host/QaConfigForm";
import { ensureAuthenticated } from "../../jwt.server";
import {
  emitQaChangedEvent,
  qaConfigChangedEventName,
} from "../../../events.server";

export const path = "/qa/admin/:qaId/config";
export const method = "post";

export const preHandler: preHandlerAsyncHookHandler[] = [
  ensureAuthenticated,
  isQaAdmin,
];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});
const body = Type.Object({
  areVotesEnabled: Type.Optional(Type.String()),
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
  const config = await db.qAConfig.update({
    data: {
      areVotesEnabled: !!req.body.areVotesEnabled,
    },
    where: {
      qaId,
    },
  });
  emitQaChangedEvent(qaId, qaConfigChangedEventName(qaId));
  return <QaConfigForm qaConfig={config} />;
}
