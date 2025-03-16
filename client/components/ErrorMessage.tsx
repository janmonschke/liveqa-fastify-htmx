import { escapeHtml } from "@kitajs/html";
import styles from "./ErrorMessage.module.css";

export function ErrorMessage({ message }: { message: string }) {
  return <p class={styles.ErrorMessage}>{escapeHtml(message)}</p>;
}
