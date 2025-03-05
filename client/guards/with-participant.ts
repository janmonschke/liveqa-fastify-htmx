import { Participant } from "@prisma/client";
import type {
  FastifyInstance,
  FastifyRequest,
  preHandlerAsyncHookHandler,
} from "fastify";
import {
  parseParticipantCookie,
  setParticipantCookie,
} from "../cookies.server";
import { db } from "../db.server";

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
    try {
      const participant = await db.participant.findFirst({
        where: {
          id: participantId,
          qaId,
        },
      });
      req.participant = participant;
    } catch (e) {
      return reply.code(404).send("Could not find participant");
    }
  } else {
    try {
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
    } catch (e) {
      return reply.code(404).send("Could not create participant");
    }
  }
};

export function extractParticipant(req: FastifyRequest) {
  const participant = req.participant;
  if (participant) {
    return participant;
  } else {
    throw new Error(
      "participant is not defined. Make sure `withParticipant` is set as a preHandler"
    );
  }
}
