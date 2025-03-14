import { remember } from "@epic-web/remember";
import EventEmitter from "node:events";

export const emitter = remember("emitter", () => new EventEmitter());

type QaId = string;
export const qaConfigChangedPrefix = `qa:config:changed`;
export type QaConfigChanged = `${typeof qaConfigChangedPrefix}:${QaId}`;
type TopicId = string;
type QuestionId = string;
export type QaTopicChanged = `qa:topic:changed:${TopicId}`;
export type QaTopicQuestionChanged =
  `${QaTopicChanged}:question:changed:${QuestionId}`;
export type QaChanged = `qa:changed:${QaId}`;
export type QaQuestionDelete =
  `qa:changed:${QaId}:question:delete:${QuestionId}`;

export const qaChangedEventName: (qaId: string) => QaChanged = (qaId: string) =>
  `qa:changed:${qaId}`;
export const qaQuestionDelete: (
  qaId: string,
  questionId: string
) => QaQuestionDelete = (qaId: string, questionId: string) =>
  `${qaChangedEventName(qaId)}:question:delete:${questionId}`;
export const qaConfigChangedEventName: (qaId: string) => QaConfigChanged = (
  qaId: string
) => `qa:config:changed:${qaId}`;
export const qaTopicChangedEventName: (topicId: string) => QaTopicChanged = (
  topicId: string
) => `qa:topic:changed:${topicId}`;
// currently unused
export const qaQuestionChangedEventName: (
  topicId: TopicId,
  questionId: QuestionId
) => QaTopicQuestionChanged = (topicId, questionId) =>
  `${qaTopicChangedEventName(topicId)}:question:changed:${questionId}`;

export type QaChangedEvent = {
  name:
    | QaTopicChanged
    | QaConfigChanged
    | QaTopicQuestionChanged
    | QaQuestionDelete;
};
export function emitQaChangedEvent(
  qaId: string,
  actualEvent: QaChangedEvent["name"]
) {
  const eventName = qaChangedEventName(qaId);
  emitter.emit(eventName, {
    name: actualEvent,
  });
}
