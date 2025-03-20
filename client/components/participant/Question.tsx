import { escapeHtml } from "@kitajs/html";
import { qaAddVote, qaDeleteVote, qaQuestionDelete } from "../../urls";
import { DeleteIcon, DoubleArrowDown, DoubleArrowUp } from "../icons/Icons";
import { qaQuestionDelete as questionDeleteEvent } from "../../../events.server";
import { Button } from "../Button";
import { Card } from "../Card";
import { QuestionWithVotes } from "../../../types";

import styles from "./Question.module.css";

export function QuestionListItem({
  question,
  canDelete,
  canVote,
  qaId,
}: {
  question: QuestionWithVotes;
  canDelete: boolean;
  canVote: boolean;
  qaId: string;
}) {
  const votesCount = question.votes.length;
  const safeVotesText =
    question.votes.length === 1 ? "1 vote" : `${votesCount} votes`;
  return (
    <li
      class={[styles.Question, "mb-3"]}
      sse-swap={`sse:${questionDeleteEvent(qaId, question.id)}`}
      hx-swap="delete"
    >
      <Card>
        <div class={styles.Container}>
          <div>
            <div>{escapeHtml(question.text)}</div>
            <div class="is-size-6 has-text-weight-light">{safeVotesText}</div>
          </div>
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
                hx-confirm={`Delete question: ${escapeHtml(question.text)}?`}
              >
                <input type="hidden" name="topicId" value={question.topicId} />
                <input type="hidden" name="questionId" value={question.id} />

                <Button size="small" variant="error" title="Delete question">
                  <span class="icon">
                    <DeleteIcon />
                  </span>
                </Button>
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

                <Button size="small" title="Add vote">
                  <span class="icon">
                    <DoubleArrowUp />
                  </span>
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

                <Button size="small" title="Remove vote">
                  <span class="icon">
                    <DoubleArrowDown />
                  </span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </Card>
    </li>
  );
}
