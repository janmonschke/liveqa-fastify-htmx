import { Html } from "@kitajs/html";
import { authenticated, extractUser } from "./jwt";
import { RouteProps } from "../../types";

export const path = "/host";

export const preHandler = [authenticated];

export default function HostPage({ req }: RouteProps) {
  const user = extractUser(req);
  return (
    <div>
      <h1>Host page</h1>
      {Html.escapeHtml(user.name)}
    </div>
  );
}
