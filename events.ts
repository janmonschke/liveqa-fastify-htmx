import { remember } from "@epic-web/remember";
import EventEmitter from "node:events";

export const emitter = remember("emitter", () => new EventEmitter());

type QaId = string;
export type QaConfigChanged = `qa:config:changed:${QaId}`;
type TopicId = string;
export type QaTopicChanged = `qa:topic:changed:${TopicId}`;
export type QaChanged = `qa:changed:${QaId}`;

export const qaChangedEventName: (qaId: string) => QaChanged = (qaId: string) =>
  `qa:changed:${qaId}`;
export const qaConfigChangedEventName: (qaId: string) => QaConfigChanged = (
  qaId: string
) => `qa:config:changed:${qaId}`;
export const qaTopicChangedEventName: (topicId: string) => QaTopicChanged = (
  topicId: string
) => `qa:topic:changed:${topicId}`;

export type QaChangedEvent = {
  name: QaTopicChanged | QaConfigChanged;
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
