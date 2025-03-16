import styles from "./QuestionModal.module.css";
import "./QuestionModal.client.ts";
import { questionModalId } from "./ModalConfig";

export default function QuestionModal() {
  return (
    <aside>
      <dialog id={questionModalId} class={styles.Dialog}></dialog>
    </aside>
  );
}
