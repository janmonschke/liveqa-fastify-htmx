import { Html } from "@kitajs/html";
import { authenticated, extractUser } from "./jwt";
import { RouteProps } from "../../types";
import { QaList } from "../components/host/QaList";
import { AddQaForm } from "../components/host/AddQaForm";

export const path = "/host";

export const preHandler = [authenticated];

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
