import { ensureAuthenticated, extractUser } from "../jwt.server";
import type { RouteProps } from "../../types";
import { AddQaForm } from "../components/host/AddQaForm";
import { QaList } from "../components/host/QaList";

export const path = "/host";

export const preHandler = [ensureAuthenticated];

export default async function HostPage({ req }: RouteProps) {
  const user = extractUser(req);

  return (
    <div>
      <h1 class="title is-1">QAs</h1>
      <div id="host-qalist" class="mb-5">
        <QaList hostId={user.id} />
      </div>
      <div id="host-addqaform">
        <AddQaForm hostId={user.id} />
      </div>
    </div>
  );
}
