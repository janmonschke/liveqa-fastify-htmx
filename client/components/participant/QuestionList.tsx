import type { Question as QuestionType, Vote } from "@prisma/client";
import { QuestionListItem } from "./Question";
import { questionList } from "../../urls";
import { qaTopicChangedEventName } from "../../../events";
import baseStyles from "../../assets/base.module.css";

interface QuestionWithVotes extends QuestionType {
  votes: Vote[];
}

export function questionListElementForTopicIc(topicId: string) {
  return `questionlist-topic-${topicId}`;
}

export function QuestionList({
  questions,
  topicId,
  participantId,
  qaId,
}: {
  questions: QuestionWithVotes[];
  topicId: string;
  qaId: string;
  participantId: string;
}) {
  return (
    <ol
      class={baseStyles.OrderedList}
      id={questionListElementForTopicIc(topicId)}
      hx-get={questionList(qaId, topicId)}
      hx-trigger={`sse:${qaTopicChangedEventName(topicId)}`}
      hx-swap="outerHTML"
    >
      {questions.map((question) => (
        <QuestionListItem
          question={question}
          canDelete={question.participantId === participantId}
          qaId={qaId}
          canVote={
            question.votes.find(
              (vote) => vote.participantId === participantId
            ) === undefined
          }
        />
      ))}
    </ol>
  );
}
