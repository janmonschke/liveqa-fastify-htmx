import { Html } from "@kitajs/html";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { Static, Type } from "@fastify/type-provider-typebox";
import { isQaAdmin } from "../guards/is-qa-admin";
import { ensureAuthenticated } from "../jwt.server";
import { RouteProps } from "../../types";
import { qa as qaUrl, qaQr } from "../urls";
import QaConfigForm from "../components/host/QaConfigForm";
import { AddTopicForm } from "../components/host/AddTopicForm";
import { HostQaTopicsList } from "../components/host/HostQaTopicsList";
import { fetchQaWithTopicsAndQuestions } from "../fetch.server";

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
      <h1>{Html.escapeHtml(qa.title)}</h1>
      <div>
        <a href={qaQr(qa.id)} target="_blank" rel="noreferrer">
          Open QR code
          {/* <ArrowTopRightIcon /> */}
        </a>
        <a href={qaUrl(qa.id)} target="_blank" rel="noreferrer">
          Open Live QA
          {/* <ArrowTopRightIcon /> */}
        </a>
      </div>
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
