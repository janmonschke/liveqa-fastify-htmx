import { FastifyInstance, FastifyRequest, FastifySchema } from "fastify";
import { Type, Static } from "@fastify/type-provider-typebox";
import {
  emitQaChangedEvent,
  emitter,
  qaChangedEventName,
  qaConfigChangedEventName,
} from "./events.server";
import { on } from "node:events";

setInterval(() => {
  const qaId = "b8f98e68-2e0b-4b20-8de6-fa58d4f2e02d";
  emitQaChangedEvent(qaId, qaConfigChangedEventName(qaId));
}, 2000);
const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});

const schema: FastifySchema = {
  params,
};

type Request = FastifyRequest<{ Params: Static<typeof params> }>;
export function initializeSSEServer(server: FastifyInstance) {
  server.get(
    "/sse/qa/:qaId",
    {
      schema,
    },
    (req: Request, reply) => {
      const eventName = qaChangedEventName(req.params.qaId);
      server.log.info({ eventName });
      return reply.sse(
        (async function* () {
          for await (const [event] of on(emitter, eventName)) {
            yield {
              event: event ? event.name : "test",
              data: "<div />",
            };
          }
        })()
      );
    }
  );
}
