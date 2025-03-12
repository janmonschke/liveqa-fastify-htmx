import { Html } from "@kitajs/html";
import { Question } from "@prisma/client";
import { qaAddVote, qaDeleteVote, qaQuestionDelete } from "../../urls";
import { DoubleArrowDown, DoubleArrowUp } from "../icons/Icons";
import { qaQuestionDelete as questionDeleteEvent } from "../../../events";
import styles from "./Question.module.css";
import { Button } from "../Button";

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
      class={styles.Question}
      sse-swap={`sse:${questionDeleteEvent(qaId, question.id)}`}
      hx-swap="delete"
    >
      {Html.escapeHtml(question.text)}
      <div class={styles.Buttons}>
        {canDelete ? (
          <form
            action={qaQuestionDelete(qaId)}
            method="post"
            hx-boost="true"
            hx-replace-url="false"
            hx-target="closest li"
            hx-swap="outerHTML"
            hx-disabled-elt="find button"
            hx-indicator="find button"
          >
            <input type="hidden" name="topicId" value={question.topicId} />
            <input type="hidden" name="questionId" value={question.id} />

            <Button variant="error">Delete</Button>
          </form>
        ) : null}
        {canVote ? (
          <form
            action={qaAddVote(qaId)}
            method="post"
            hx-boost="true"
            hx-replace-url="false"
            hx-swap="none"
            hx-disabled-elt="find button"
            hx-indicator="find button"
          >
            <input type="hidden" name="topicId" value={question.topicId} />
            <input type="hidden" name="questionId" value={question.id} />

            <Button>
              <DoubleArrowUp />
            </Button>
          </form>
        ) : (
          <form
            action={qaDeleteVote(qaId)}
            method="post"
            hx-boost="true"
            hx-replace-url="false"
            hx-swap="none"
            hx-disabled-elt="find button"
            hx-indicator="find button"
          >
            <input type="hidden" name="topicId" value={question.topicId} />
            <input type="hidden" name="questionId" value={question.id} />

            <Button>
              <DoubleArrowDown />
            </Button>
          </form>
        )}
      </div>
    </li>
  );
}
