import Fastify from "fastify";
import FastifyVite from "@fastify/vite";
import FastifyFormBody from "@fastify/formbody";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import cookie, { type FastifyCookieOptions } from "@fastify/cookie";
import jwt from "@fastify/jwt";
import { FastifySSEPlugin } from "fastify-sse-v2";
import { initializeGuards } from "./client/guards";
import { initializeSSEServer } from "./sse";

const server = Fastify({
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

const cookieOptions: FastifyCookieOptions = {
  secret: process.env.COOKIE_SECRET || undefined,
  parseOptions: {
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 100,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

await server.register(jwt, {
  secret:
    process.env.JWT_SECRET || "2i3r203nfi23fmpqefmlw'lefk2[]2-0efj209j0294hjg",
});
await server.register(FastifySSEPlugin);
await server.register(cookie, cookieOptions);
await server.register(import("@fastify/compress"));
await server.register(FastifyFormBody);
await server.register(FastifyVite, {
  root: import.meta.url,
  renderer: "@fastify/htmx",
});

initializeSSEServer(server);
initializeGuards(server);

await server.vite.ready();

const port = parseInt(process.env.PORT || "3000");
await server.listen({ port, host: "0.0.0.0" });
