import { escapeHtml } from "@kitajs/html";
import type { Vote } from "@prisma/client";
import { Card } from "../Card";
import { Button } from "../Button";
import { DeleteIcon } from "../icons/Icons";
import styles from "./HostQuestion.module.css";
import { qaAdminQuestionDelete } from "../../urls";

export function HostQuestion({
  qaId,
  question,
}: {
  qaId: string;
  question: { text: string; id: string; votes: Vote[] };
}) {
  const votesCount = question.votes.length;
  const safeVotesText =
    question.votes.length === 1 ? "1 vote" : `${votesCount} votes`;
  const { text, id } = question;
  return (
    <Card>
      <div class={styles.Container}>
        <div>
          <div>{escapeHtml(text)}</div>
          <div class="is-size-6 has-text-weight-light">{safeVotesText}</div>
        </div>
        <div>
          <span>
            <form
              method="post"
              action={qaAdminQuestionDelete(qaId, id)}
              hx-boost="true"
              hx-target="closest li"
              hx-replace-url="false"
              hx-confirm={`Delete question: ${escapeHtml(text)}?`}
              hx-swap="outerHTML"
            >
              <input type="hidden" name="questionId" value={id} />
              <Button size="small" variant="error" title="Delete question">
                <span class="icon">
                  <DeleteIcon />
                </span>
              </Button>
            </form>
          </span>
        </div>
      </div>
    </Card>
  );
}
