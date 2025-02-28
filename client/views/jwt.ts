import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  preHandlerAsyncHookHandler,
} from "fastify";
import { db } from "../db";
import { Host } from "@prisma/client";

const JWT_COOKIE_NAME = "access_token";

export type TokenContent = {
  id: string;
  name: string;
};

export function signTokenAndSetCookie(
  tokenContent: TokenContent,
  app: FastifyInstance,
  reply: FastifyReply
) {
  const token = app.jwt.sign(tokenContent);
  reply.setCookie(JWT_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: true,
  });
}

export const authenticated: preHandlerAsyncHookHandler =
  async function authenticated(req, reply) {
    try {
      const res = await this.jwt.verify<TokenContent>(
        req.cookies.access_token || "",
        {
          onlyCookie: true,
        }
      );
      const user = await db.host.findFirst({ where: { id: res.id } });
      if (!user) {
        throw new Error("Could not load user from token.");
      } else {
        req.user = user;
      }
    } catch (err) {
      this.log.error(err);
      reply.setCookie(JWT_COOKIE_NAME, "").redirect("/login");
    }
  };

export function extractUser(req: FastifyRequest) {
  const user = req.user as unknown as Host | undefined;
  if (user) {
    return user;
  } else {
    throw new Error(
      "req.user is not defined. Make sure the route has a `authenticated` preHandler"
    );
  }
}
