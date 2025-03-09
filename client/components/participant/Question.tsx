import { Html } from "@kitajs/html";
import { Question } from "@prisma/client";
import { qaQuestionCrud, qaQuestionDelete } from "../../urls";

export function QuestionListItem({
  question,
  canDelete,
  qaId,
}: {
  question: Question;
  canDelete: boolean;
  qaId: string;
}) {
  return (
    <li>
      {Html.escapeHtml(question.text)}
      {canDelete ? (
        <form
          action={qaQuestionDelete(qaId)}
          method="post"
          hx-boost="true"
          hx-replace-url="false"
          hx-target="closest li"
          hx-swap="outerHTML"
        >
          <input type="hidden" name="topicId" value={question.topicId} />
          <input type="hidden" name="questionId" value={question.id} />

          <button type="submit">Delete</button>
        </form>
      ) : null}
    </li>
  );
}
