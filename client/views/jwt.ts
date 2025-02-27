import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

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

export async function verifyToken(
  app: FastifyInstance,
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const res = await app.jwt.verify(req.cookies.access_token || "", {
      onlyCookie: true,
    });
    req.user = res;
  } catch (err) {
    reply.redirect("/login");
  }
}
