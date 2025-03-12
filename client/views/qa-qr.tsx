import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema } from "fastify";
import { RouteProps } from "../../types";
import { qa } from "../urls";
import styles from "./qa-qr.module.css";
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
    <section class={styles.Container}>
      <canvas id="qrcode" data-path={url} />
      <h1 class={styles.Headline}>
        Add questions, vote for questions, fully anonymously.
      </h1>
    </section>
  );
}
