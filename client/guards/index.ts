import { FastifyInstance } from "fastify";
import { initializeWithParticipantGuard } from "./with-participant.server";

export function initializeGuards(server: FastifyInstance) {
  initializeWithParticipantGuard(server);
}
