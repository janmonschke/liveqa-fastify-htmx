import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  preHandlerAsyncHookHandler,
} from "fastify";
import { db } from "./db.server";
import type { Host } from "@prisma/client";
import { JWT } from "@fastify/jwt";

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

async function fetchUserFromToken(req: FastifyRequest, jwt: JWT) {
  const res = await jwt.verify<TokenContent>(req.cookies.access_token || "", {
    onlyCookie: true,
  });
  return await db.host.findFirst({ where: { id: res.id } });
}

export const redirectIfLoggedin: (
  destination: string
) => preHandlerAsyncHookHandler = function (destination) {
  return async function redirectIf(req, reply) {
    try {
      const user = await fetchUserFromToken(req, this.jwt);
      if (user) {
        reply.redirect(destination);
      }
    } catch (err) {}
  };
};

export const ensureAuthenticated: preHandlerAsyncHookHandler =
  async function authenticated(req, reply) {
    try {
      const user = await fetchUserFromToken(req, this.jwt);
      if (!user) {
        throw new Error("Could not load user from token.");
      } else {
        req.user = user;
      }
    } catch (err) {
      this.log.error(err);
      logout(reply).redirect("/login");
    }
  };

export function extractUser(req: FastifyRequest) {
  const user = req.user as unknown as Host | undefined;
  if (user) {
    return user;
  } else {
    throw new Error(
      "req.user is not defined. Make sure the route has a `ensureAuthenticated,` preHandler"
    );
  }
}

export function logout(reply: FastifyReply) {
  return reply.setCookie(JWT_COOKIE_NAME, "");
}
