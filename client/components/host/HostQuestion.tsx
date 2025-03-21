import { escapeHtml } from "@kitajs/html";
import { Card } from "../Card";
import { Button } from "../Button";
import { DeleteIcon } from "../icons/Icons";
import styles from "./HostQuestion.module.css";
import { qaAdmingQuestionResolved, qaAdminQuestionDelete } from "../../urls";
import { QuestionWithVotes } from "../../../types";

export function HostQuestion({
  qaId,
  question,
}: {
  qaId: string;
  question: QuestionWithVotes;
}) {
  const votesCount = question.votes.length;
  const safeVotesText =
    question.votes.length === 1 ? "1 vote" : `${votesCount} votes`;
  const { text, id, topicId } = question;
  return (
    <Card>
      <div class={styles.Container}>
        <div>
          <div>{escapeHtml(text)}</div>
          <div class="is-size-6 has-text-weight-light">{safeVotesText}</div>
        </div>
        <div class={styles.Buttons}>
          <form
            class={styles.CheckboxForm}
            method="post"
            action={qaAdmingQuestionResolved(qaId, id)}
            hx-boost="true"
            hx-target="this"
            hx-swap="none"
            hx-replace-url="false"
            hx-trigger="change"
          >
            <input type="hidden" name="topicId" value={topicId} />
            <input
              type="checkbox"
              class={styles.Checkbox}
              name="isResolved"
              title={
                question.resolved ? "Mark as NOT resolved" : "Mark as resolved"
              }
              checked={question.resolved}
            />
          </form>
          <form
            method="post"
            action={qaAdminQuestionDelete(qaId, id)}
            hx-boost="true"
            hx-target="closest li"
            hx-replace-url="false"
            hx-confirm={`Delete question: ${escapeHtml(text)}?`}
            hx-swap="outerHTML"
          >
            <input type="hidden" name="topicId" value={topicId} />
            <Button size="small" variant="error" title="Delete question">
              <span class="icon">
                <DeleteIcon />
              </span>
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
