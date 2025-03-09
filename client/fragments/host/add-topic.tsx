import { Html } from "@kitajs/html";
import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { isQaAdmin } from "../../guards/is-qa-admin";
import { RouteProps } from "../../../types";
import { db } from "../../db.server";
import { ensureAuthenticated } from "../../jwt.server";
import { AddTopicForm } from "../../components/host/AddTopicForm";
import { fetchQaWithTopicsAndQuestions } from "../../fetch.server";
import { HostQaTopic } from "../../components/host/HostQaTopic";
import { emitQaChangedEvent, qaConfigChangedEventName } from "../../../events";

export const path = "/qa/admin/:qaId/topic";
export const method = "post";

export const preHandler: preHandlerAsyncHookHandler[] = [
  ensureAuthenticated,
  isQaAdmin,
];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});
const body = Type.Object({
  title: Type.String(),
  order: Type.Number(),
});

export const schema: FastifySchema = {
  params,
  body,
};

export default async function ({
  req,
}: RouteProps<{
  Params: Static<typeof params>;
  Body: Static<typeof body>;
}>) {
  const { qaId } = req.params;
  const topic = await db.topic.create({
    data: {
      qaId,
      title: req.body.title,
      order: req.body.order,
    },
    include: {
      questions: true,
    },
  });
  emitQaChangedEvent(qaId, qaConfigChangedEventName(qaId));
  const qa = await fetchQaWithTopicsAndQuestions(qaId);
  return (
    <>
      {/* Adds the item topic to the list */}
      <div hx-swap-oob="beforeend:#qa-admin-topic-list ol">
        <li>
          <HostQaTopic
            topic={topic}
            topics={qa.Topic}
            index={qa.Topic.length - 1}
          />
        </li>
      </div>
      {/* Resets the form */}
      <AddTopicForm qaId={qaId} topics={qa.Topic} />
    </>
  );
}
