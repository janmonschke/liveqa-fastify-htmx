import { FastifyInstance } from "fastify";
import { initializeWithParticipantGuard } from "./with-participant";

export function initializeGuards(server: FastifyInstance) {
  initializeWithParticipantGuard(server);
}
