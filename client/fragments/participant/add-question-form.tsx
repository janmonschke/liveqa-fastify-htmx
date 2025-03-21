import { escapeHtml } from "@kitajs/html";
import { type Static, Type } from "@fastify/type-provider-typebox";
import type { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import type { RouteProps } from "../../../types";
import { withParticipant } from "../../guards/with-participant.server";
import { db } from "../../db.server";
import { qaQuestionCrud } from "../../urls";
import { questionListElementForTopicIc } from "../../components/participant/QuestionList";
import { Button } from "../../components/Button";
import { hideQuestionDialog } from "../../components/participant/ModalConfig";

export const path = `/qa/:qaId/topic/:topicId/question-form`;
export const preHandler: preHandlerAsyncHookHandler[] = [withParticipant];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
  topicId: Type.String({ minLength: 1 }),
});

export const schema: FastifySchema = {
  params,
};

export default async function ({
  req,
}: RouteProps<{
  Params: Static<typeof params>;
}>) {
  const { qaId, topicId } = req.params;
  const topic = await db.topic.findFirstOrThrow({ where: { id: topicId } });
  return (
    <div>
      <h3 class="subtitle is-5 mt-2 mb-4">
        Add question to: <code>{escapeHtml(topic.title)}</code>
      </h3>
      <form
        method="post"
        action={qaQuestionCrud(qaId)}
        hx-boost="true"
        hx-replace-url="false"
        hx-target={`#${questionListElementForTopicIc(topicId)}`}
        hx-swap="beforeend"
        hx-disabled-elt="find input[type='text'], find button"
        hx-indicator="find button"
        {...{ "hx-on::after-request": hideQuestionDialog }}
      >
        <input type="hidden" name="topicId" value={topicId} />
        <div class="field">
          <textarea
            class="textarea"
            rows="2"
            placeholder="Question..."
            name="text"
            required
            style={{ width: "100%" }}
          ></textarea>
        </div>
        <Button size="small" type="submit" class="mb-2">
          Add question
        </Button>
      </form>
    </div>
  );
}
