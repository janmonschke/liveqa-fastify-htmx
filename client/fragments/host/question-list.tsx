import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { RouteProps } from "../../../types";
import { fetchQuestionsForTopic } from "../../fetch.server";
import { isQaAdmin } from "../../guards/is-qa-admin.server";
import { HostQuestionList } from "../../components/host/HostQuestionList";
import { ensureAuthenticated } from "../../jwt.server";

export const path = `/qa/:qaId/admin/topic/:topicId/questions`;
export const preHandler: preHandlerAsyncHookHandler[] = [
  ensureAuthenticated,
  isQaAdmin,
];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
  topicId: Type.String(),
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
  const questions = await fetchQuestionsForTopic(topicId);
  return (
    <HostQuestionList qaId={qaId} questions={questions} topicId={topicId} />
  );
}
