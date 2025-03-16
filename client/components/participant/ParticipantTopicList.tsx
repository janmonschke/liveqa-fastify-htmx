import { escapeHtml } from "@kitajs/html";
import { QuestionList, questionListElementForTopicIc } from "./QuestionList";
import { qaQuestionCrud } from "../../urls";
import type { TopicWithQuestionsAndVotes } from "../../../types";
import baseStyles from "../../assets/base.module.css";
import { Button } from "../Button";
import { showQuestionDialog } from "./QuestionModal";

export function ParticipantTopicList({
  topics,
  participantId,
}: {
  topics: TopicWithQuestionsAndVotes[];
  participantId: string;
}) {
  return (
    <section>
      <ol class={baseStyles.OrderedList}>
        {topics.map((topic) => (
          <li>
            <h2>{escapeHtml(topic.title)}</h2>
            <QuestionList
              participantId={participantId}
              topicId={topic.id}
              questions={topic.questions}
              qaId={topic.qaId}
            />
            <button
              hx-get={`/qa/${topic.qaId}/topic/${topic.id}/question-form`}
              hx-trigger="mouseover,focus"
              hx-target="#question-dialog"
              onclick={showQuestionDialog}
            >
              Add question
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
