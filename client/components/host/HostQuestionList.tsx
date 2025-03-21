import { qaTopicChangedEventName } from "../../../events";
import { QuestionWithVotes } from "../../../types";
import { questionListAdmin } from "../../urls";
import { HostQuestion } from "./HostQuestion";
import styles from "./HostQuestionList.module.css";

export function questionListAdminElementForTopicIc(topicId: string) {
  return `questionlist-admin-topic-${topicId}`;
}

export function HostQuestionList({
  qaId,
  topicId,
  questions,
}: {
  qaId: string;
  topicId: string;
  questions: QuestionWithVotes[];
}) {
  return (
    <ol
      id={questionListAdminElementForTopicIc(topicId)}
      hx-get={questionListAdmin(qaId, topicId)}
      hx-trigger={`sse:${qaTopicChangedEventName(topicId)}`}
      hx-swap="outerHTML"
      class={styles.List}
    >
      {questions.map((question) => (
        <li class="mb-3">
          <HostQuestion qaId={qaId} question={question} />
        </li>
      ))}
    </ol>
  );
}
