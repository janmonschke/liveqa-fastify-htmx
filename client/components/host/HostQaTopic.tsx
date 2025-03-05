import { Html } from "@kitajs/html";
import { TopicWithQuestions } from "../../../types";
import { qaTopicDelete, qaTopicSwap } from "../../urls";

export function hostQaTopicId(topicId: string) {
  return `qa-admin-topic-${topicId}`;
}

export function HostQaTopic({
  topic,
  topics,
  index,
}: {
  topic: TopicWithQuestions;
  topics: TopicWithQuestions[];
  index: number;
}) {
  return (
    <div>
      <h3>{Html.escapeHtml(topic.title)}</h3>
      {index !== 0 ? (
        <form
          method="post"
          action={qaTopicSwap(topic.qaId)}
          hx-boost="true"
          hx-replace-url="false"
          hx-target="#qa-admin-topic-list"
        >
          <input type="hidden" name="topicAId" value={topic.id} />
          <input type="hidden" name="topicBId" value={topics[index - 1].id} />
          <input
            type="hidden"
            name="newPositionA"
            value={topics[index - 1].order.toString()}
          />
          <input
            type="hidden"
            name="newPositionB"
            value={topic.order.toString()}
          />
          <input type="submit" value="Up" />
        </form>
      ) : null}
      {index < topics.length - 1 ? (
        <form
          method="post"
          action={qaTopicSwap(topic.qaId)}
          hx-boost="true"
          hx-replace-url="false"
          hx-target="#qa-admin-topic-list"
        >
          <input type="hidden" name="topicAId" value={topic.id} />
          <input type="hidden" name="topicBId" value={topics[index + 1].id} />
          <input
            type="hidden"
            name="newPositionA"
            value={topics[index + 1].order.toString()}
          />
          <input
            type="hidden"
            name="newPositionB"
            value={topic.order.toString()}
          />
          <input type="submit" value="Down" />
        </form>
      ) : null}
      <form
        method="post"
        action={qaTopicDelete(topic.qaId)}
        hx-boost="true"
        hx-target={`#${hostQaTopicId(topic.id)}`}
        hx-replace-url="false"
        hx-confirm={`Delete topic: ${topic.title}?`}
        hx-swap="outerHTML"
      >
        <input type="hidden" name="topicId" value={topic.id} />
        <input
          type="submit"
          title={`Delete topic: ${topic.title}`}
          value="Delete"
        />
      </form>
    </div>
  );
}
