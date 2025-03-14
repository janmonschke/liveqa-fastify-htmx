import { FastifySchema, preHandlerAsyncHookHandler } from "fastify";
import { Html } from "@kitajs/html";
import { Static, Type } from "@fastify/type-provider-typebox";
import { RouteProps } from "../../types";
import {
  extractParticipant,
  withParticipant,
} from "../guards/with-participant";
import { qaSse, qaTopicsList } from "../urls";
import "./qa.client.ts";
import { ParticipantTopicList } from "../components/participant/ParticipantTopicList";
import { qaConfigChangedEventName } from "../../events.server";
import { fetchQaWithTopicsAndQuestions } from "../fetch.server";

export const path = "/qa/:qaId";
export const preHandler: preHandlerAsyncHookHandler[] = [withParticipant];

const params = Type.Object({
  qaId: Type.String({ minLength: 1 }),
});

export const schema: FastifySchema = {
  params,
};

export const head = (
  <>
    <title>LiveQa</title>
  </>
);

export default async function ({
  req,
}: RouteProps<{ Params: Static<typeof params> }>) {
  const participant = extractParticipant(req);
  const { qaId } = req.params;

  const qa = await fetchQaWithTopicsAndQuestions(qaId);

  return (
    <section hx-ext="sse" sse-connect={qaSse(qaId)}>
      <h1>{Html.escapeHtml(qa.title)}</h1>
      <div
        id="participant-topic-list"
        hx-get={qaTopicsList(qaId)}
        hx-trigger={`sse:${qaConfigChangedEventName(qaId)}`}
      >
        <ParticipantTopicList
          topics={qa.Topic}
          participantId={participant.id}
        />
      </div>
    </section>
  );
}
