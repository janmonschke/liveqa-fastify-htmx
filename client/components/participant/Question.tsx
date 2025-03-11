import { Html } from "@kitajs/html";
import { Question } from "@prisma/client";
import { qaAddVote, qaDeleteVote, qaQuestionDelete } from "../../urls";
import { DoubleArrowDown, DoubleArrowUp } from "../icons/Icons";
import { qaQuestionDelete as questionDeleteEvent } from "../../../events";

export function QuestionListItem({
  question,
  canDelete,
  canVote,
  qaId,
}: {
  question: Question;
  canDelete: boolean;
  canVote: boolean;
  qaId: string;
}) {
  return (
    <li
      sse-swap={`sse:${questionDeleteEvent(qaId, question.id)}`}
      hx-swap="delete"
    >
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

          <button type="submit" class="error">
            Delete
          </button>
        </form>
      ) : null}
      {canVote ? (
        <form
          action={qaAddVote(qaId)}
          method="post"
          hx-boost="true"
          hx-replace-url="false"
          hx-swap="none"
        >
          <input type="hidden" name="topicId" value={question.topicId} />
          <input type="hidden" name="questionId" value={question.id} />

          <button type="submit">
            <DoubleArrowUp />
          </button>
        </form>
      ) : (
        <form
          action={qaDeleteVote(qaId)}
          method="post"
          hx-boost="true"
          hx-replace-url="false"
          hx-swap="none"
        >
          <input type="hidden" name="topicId" value={question.topicId} />
          <input type="hidden" name="questionId" value={question.id} />

          <button type="submit">
            <DoubleArrowDown />
          </button>
        </form>
      )}
    </li>
  );
}
