import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema } from "fastify";
import { RouteProps } from "../../types";
import { qa } from "../urls";
import "./qa-qr.client.ts";

export const path = "/qa/qr/:qaId";

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});

export const schema: FastifySchema = {
  params,
};

export default async function ({
  req,
}: RouteProps<{ Params: Static<typeof params> }>) {
  const url = qa(req.params.qaId);
  return (
    <section>
      <canvas id="qrcode" data-path={url} />
      <h2 id="qrurl"></h2>
    </section>
  );
}
