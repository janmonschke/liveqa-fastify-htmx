import styles from "./QuestionModal.module.css";
export const ssr = false;
import "./QuestionModal.client.ts";

export const questionModalId = "question-dialog";
export const showQuestionDialog = `window['${questionModalId}'].showModal()`;
export const hideQuestionDialog = `window['${questionModalId}'].close()`;

export default function QuestionModal() {
  return (
    <aside>
      <dialog id="question-dialog" class={styles.Dialog}></dialog>
    </aside>
  );
}
