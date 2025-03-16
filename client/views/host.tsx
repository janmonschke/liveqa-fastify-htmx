import { escapeHtml } from "@kitajs/html";
import { ensureAuthenticated, extractUser } from "../jwt.server";
import { RouteProps } from "../../types";
import { QaList } from "../components/host/QaList";
import type { RouteProps } from "../../types";
import { AddQaForm } from "../components/host/AddQaForm";
import { db } from "../db.server";
import { qaAdmin } from "../urls";

export const path = "/host";

export const preHandler = [ensureAuthenticated];

export default async function HostPage({ req }: RouteProps) {
  const user = extractUser(req);

  return (
    <div>
      <h1>QAs</h1>
      <div id="host-qalist">
        <QaList hostId={user.id} />
      </div>
      <div id="host-addqaform">
        <AddQaForm hostId={user.id} />
      </div>
      <div id="host-errormessage"></div>
    </div>
  );
}
