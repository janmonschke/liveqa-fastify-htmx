import { escapeHtml } from "@kitajs/html";
import type { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { type Static, Type } from "@fastify/type-provider-typebox";
import { isQaAdmin } from "../guards/is-qa-admin.server";
import { ensureAuthenticated } from "../jwt.server";
import type { RouteProps } from "../../types";
import { qa as qaUrl, qaQr } from "../urls";
import QaConfigForm from "../components/host/QaConfigForm";
import { AddTopicForm } from "../components/host/AddTopicForm";
import { HostQaTopicsList } from "../components/host/HostQaTopicsList";
import { fetchQaWithTopicsAndQuestions } from "../fetch.server";
import { ArrowTopRight } from "../components/icons/Icons";
import styles from "./qaAdmin.module.css";

export const path = "/qa/admin/:qaId";

export const preHandler: preHandlerAsyncHookHandler[] = [
  ensureAuthenticated,
  isQaAdmin,
];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});

export const schema: FastifySchema = {
  params,
};

export default async function ({
  req,
}: RouteProps<{ Params: Static<typeof params> }>) {
  const qa = await fetchQaWithTopicsAndQuestions(req.params.qaId);
  const topics = qa.Topic || [];

  return (
    <section>
      <h1>{escapeHtml(qa.title)}</h1>
      <section class={styles.Links}>
        <a href={qaQr(qa.id)} target="_blank" rel="noreferrer">
          Open QR code
          <ArrowTopRight />
        </a>
        <a href={qaUrl(qa.id)} target="_blank" rel="noreferrer">
          Open Live QA
          <ArrowTopRight />
        </a>
      </section>
      <h2>Config</h2>
      {qa.QAConfig ? <QaConfigForm qaConfig={qa.QAConfig} /> : null}
      <h2>Topics</h2>
      <div id="qa-admin-topic-list">
        <HostQaTopicsList topics={topics} />
      </div>
      <AddTopicForm qaId={qa.id} topics={topics} />
    </section>
  );
}
