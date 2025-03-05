import type { preHandlerAsyncHookHandler } from "fastify";
import { db } from "../db.server";
import { extractUser } from "../jwt.server";

export const isQaAdmin: preHandlerAsyncHookHandler = async (req, reply) => {
  const qaId = (req.params as { qaId?: string }).qaId;
  if (!qaId) {
    return reply.code(400).send("qaId is missing in request");
  }
  const user = extractUser(req);

  const qa = await db.qA.findFirstOrThrow({
    where: {
      id: qaId,
    },
  });

  if (qa?.hostId != user.id) {
    return reply.code(403).send("You are not the admin of this QA");
  }
};
