import { escapeHtml } from "@kitajs/html";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <article class="message is-danger">
      <div class="message-body">{escapeHtml(message)}</div>
    </article>
  );
}
