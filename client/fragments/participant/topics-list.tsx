import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { RouteProps } from "../../../types";
import { fetchQaWithTopicsAndQuestions } from "../../fetch.server";
import {
  extractParticipant,
  withParticipant,
} from "../../guards/with-participant.server";
import { ParticipantTopicList } from "../../components/participant/ParticipantTopicList";

export const path = `/qa/:qaId/topics`;
export const preHandler: preHandlerAsyncHookHandler[] = [withParticipant];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});

export const schema: FastifySchema = {
  params,
};

export default async function ({
  req,
}: RouteProps<{
  Params: Static<typeof params>;
}>) {
  const participant = extractParticipant(req);
  const qa = await fetchQaWithTopicsAndQuestions(req.params.qaId);

  return (
    <ParticipantTopicList topics={qa.Topic} participantId={participant.id} />
  );
}
