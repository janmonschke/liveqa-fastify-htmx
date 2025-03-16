import { escapeHtml } from "@kitajs/html";
import { QuestionList, questionListElementForTopicIc } from "./QuestionList";
import { qaQuestionCrud } from "../../urls";
import type { TopicWithQuestionsAndVotes } from "../../../types";
import baseStyles from "../../assets/base.module.css";
import { Button } from "../Button";

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
            <form
              method="post"
              action={qaQuestionCrud(topic.qaId)}
              hx-boost="true"
              hx-replace-url="false"
              hx-target={`#${questionListElementForTopicIc(topic.id)}`}
              hx-swap="beforeend"
              hx-disabled-elt="find button"
              hx-indicator="find button"
              {...{ "hx-on::after-request": "this.reset()" }}
            >
              <input type="hidden" name="topicId" value={topic.id} />
              <input
                type="text"
                placeholder="Question..."
                name="text"
                required
              />
              <Button>Add question</Button>
            </form>
          </li>
        ))}
      </ol>
    </section>
  );
}
