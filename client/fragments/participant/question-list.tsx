import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { RouteProps } from "../../../types";
import {
  extractParticipant,
  withParticipant,
} from "../../guards/with-participant";
import { QuestionList } from "../../components/participant/QuestionList";
import { fetchQuestionsForTopic } from "../../fetch.server";

export const path = `/qa/:qaId/topic/:topicId/questions`;
export const preHandler: preHandlerAsyncHookHandler[] = [withParticipant];

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
  const participant = extractParticipant(req);
  const questions = await fetchQuestionsForTopic(topicId);
  return (
    <QuestionList
      qaId={qaId}
      questions={questions}
      topicId={topicId}
      participantId={participant.id}
    />
  );
}
