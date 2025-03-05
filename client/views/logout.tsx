import { preHandlerHookHandler } from "fastify";
import { logout } from "../jwt.server";

export const path = '/logout';
export const preHandler: preHandlerHookHandler = function(_, reply) {
  logout(reply).redirect('/')
}

export default function() {
  return "";
}