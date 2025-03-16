import { escapeHtml } from "@kitajs/html";
import styles from "./Toast.module.css";
import type { FastifyReply } from "fastify";
export const TOAST_CONTAINER_ID = "toast-container";

export function ToastContainer() {
  return <div id="toast-container" class={styles.ToastContainer}></div>;
}

export function ToastContent({
  message,
  type,
}: {
  message: string;
  type: "error";
}) {
  return (
    <div
      class={[styles.ToastContent, type === "error" && styles.Error]}
      onclick="this.remove()"
    >
      {escapeHtml(message)}
    </div>
  );
}

export function renderErrorToast(reply: FastifyReply, message: string) {
  reply.header("HX-Retarget", `#${TOAST_CONTAINER_ID}`);
  return <ToastContent message={message} type="error" />;
}
