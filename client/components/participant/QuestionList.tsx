import { Question as QuestionType } from "@prisma/client";
import { QuestionListItem } from "./Question";

export function questionListElementForTopicIc(topicId: string) {
  return `questionlist-topic-${topicId}`;
}

export function QuestionList({
  questions,
  topicId,
  participantId,
  qaId,
}: {
  questions: QuestionType[];
  topicId: string;
  qaId: string;
  participantId: string;
}) {
  return (
    <ol id={questionListElementForTopicIc(topicId)}>
      {questions.map((question) => (
        <QuestionListItem
          question={question}
          canDelete={question.participantId === participantId}
          qaId={qaId}
        />
      ))}
    </ol>
  );
}
