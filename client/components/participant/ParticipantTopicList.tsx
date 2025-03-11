import { Html } from "@kitajs/html";
import { QuestionList, questionListElementForTopicIc } from "./QuestionList";
import { qaQuestionCrud } from "../../urls";
import { TopicWithQuestionsAndVotes } from "../../../types";

export function ParticipantTopicList({
  topics,
  participantId,
}: {
  topics: TopicWithQuestionsAndVotes[];
  participantId: string;
}) {
  return (
    <section>
      <ol>
        {topics.map((topic) => (
          <li>
            <h3>{Html.escapeHtml(topic.title)}</h3>
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
              {...{ "hx-on::after-request": "this.reset()" }}
            >
              <input type="hidden" name="topicId" value={topic.id} />
              <input
                type="text"
                placeholder="Question..."
                name="text"
                required
              />
              <button type="submit">Add question</button>
            </form>
          </li>
        ))}
      </ol>
    </section>
  );
}
