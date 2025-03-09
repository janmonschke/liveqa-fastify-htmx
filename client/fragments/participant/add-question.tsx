import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { RouteProps } from "../../../types";
import {
  extractParticipant,
  withParticipant,
} from "../../guards/with-participant";
import { db } from "../../db.server";
import { QuestionListItem } from "../../components/participant/Question";

export const path = `/qa/:qaId/question`;
export const method = "post";
export const preHandler: preHandlerAsyncHookHandler[] = [withParticipant];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});
const body = Type.Object({
  topicId: Type.String(),
  text: Type.String(),
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
  const participant = extractParticipant(req);
  const question = await db.question.create({
    data: {
      topicId: req.body.topicId,
      participantId: participant.id,
      text: req.body.text,
    },
  });
  return (
    <QuestionListItem
      qaId={req.params.qaId}
      question={question}
      canDelete={true}
    />
  );
}
