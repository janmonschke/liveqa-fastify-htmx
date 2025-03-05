import { FastifyReply, FastifyRequest } from "fastify";

type ParticipantId = string;
export type ParticipantCookie = {
  [qaId: string]: ParticipantId | undefined;
};

export const ParticipantCookieName = "qaIdToParticipantId";
export function parseParticipantCookie(req: FastifyRequest): ParticipantCookie {
  const cookieString = req.cookies[ParticipantCookieName] || "";
  try {
    const parsed = JSON.parse(cookieString);
    if (
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      parsed !== null
    ) {
      return parsed as ParticipantCookie;
    }
  } catch (_) {}
  return {};
}

export function setParticipantCookie(
  reply: FastifyReply,
  cookie: ParticipantCookie
) {
  reply.setCookie(ParticipantCookieName, JSON.stringify(cookie));
}
