import { onRequestHookHandler, preHandlerAsyncHookHandler } from "fastify";
import { TokenContent, verifyToken } from "./jwt";
import { RouteProps } from "../../types";

export const path = "/host";

export const preHandler: preHandlerAsyncHookHandler = async function (
  req,
  reply
) {
  await verifyToken(this, req, reply);
};

export default function HostPage({ req }: RouteProps) {
  const user: TokenContent = req.user as TokenContent;
  return (
    <div>
      <h1>Host page</h1>
      {user.name}
    </div>
  );
}
