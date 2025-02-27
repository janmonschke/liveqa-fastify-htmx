import { Participant } from "@prisma/client";
import type { FastifyInstance, preHandlerAsyncHookHandler } from "fastify";
import { parseParticipantCookie, setParticipantCookie } from "../cookies";
import { db } from "../db";

declare module "fastify" {
  interface FastifyRequest {
    participant: null | Participant;
  }
}

export function initializeWithParticipantGuard(server: FastifyInstance) {
  server.decorateRequest("participant", null);
}

export const withParticipant: preHandlerAsyncHookHandler = async (
  req,
  reply
) => {
  const qaId = (req.params as { qaId?: string }).qaId;
  if (!qaId) {
    return reply.code(400).send("qaId is missing in request");
  }

  const participantCookie = parseParticipantCookie(req);
  const participantId = participantCookie[qaId];

  if (participantId) {
    const participant = await db.participant.findFirst({
      where: {
        id: participantId,
        qaId,
      },
    });

    if (!participant) {
      return reply.code(404).send("Could not find participant");
    }
    req.participant = participant;
  } else {
    const participant = await db.participant.create({
      data: {
        qaId,
      },
    });
    req.participant = participant;

    setParticipantCookie(reply, {
      ...participantCookie,
      [qaId]: participant.id,
    });
  }
};
