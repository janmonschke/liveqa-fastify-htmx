import { escapeHtml } from "@kitajs/html";
import type { TopicWithQuestionsAndVotes } from "../../../types";
import { qaTopicDelete, qaTopicSwap } from "../../urls";
import { Button } from "../Button";
import styles from "./HostQaTopic.module.css";
import { DeleteIcon, ThickArrowDown, ThickArrowUp } from "../icons/Icons";
import { HostQuestion } from "./HostQuestion";

export function hostQaTopicId(topicId: string) {
  return `qa-admin-topic-${topicId}`;
}

export function HostQaTopic({
  topic,
  topics,
  index,
}: {
  topic: TopicWithQuestionsAndVotes;
  topics: TopicWithQuestionsAndVotes[];
  index: number;
}) {
  return (
    <div class={styles.Container}>
      <div class={styles.Header}>
        <h3 class="subtitle is-5 mb-0">{escapeHtml(topic.title)}</h3>
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
            <Button size="small" title="Move topic up">
              <span class="icon">
                <ThickArrowUp />
              </span>
            </Button>
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
            <Button size="small" title="Move topic down">
              <span class="icon">
                <ThickArrowDown />
              </span>
            </Button>
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
          <Button size="small" variant="error" title="Delete topic">
            <span class="icon">
              <DeleteIcon />
            </span>
          </Button>
        </form>
      </div>
      <ol class={styles.QuestionList}>
        {topic.questions.map((question) => (
          <li class="mb-3">
            <HostQuestion qaId={topic.qaId} question={question} />
          </li>
        ))}
      </ol>
    </div>
  );
}
