import type { Topic } from "@prisma/client";
import { qaTopicCrud } from "../../urls";
import { Button } from "../Button";
import styles from "./AddTopicForm.module.css";

export function AddTopicForm({
  qaId,
  topics,
}: {
  qaId: string;
  topics: Topic[];
}) {
  return (
    <form
      method="post"
      class={styles.Form}
      action={qaTopicCrud(qaId)}
      hx-boost="true"
      hx-replace-url="false"
      hx-target="this"
      hx-swap="outerHTML"
    >
      <input
        type="hidden"
        name="order"
        value={(topics.length
          ? topics[topics.length - 1].order + 1
          : 0
        ).toString()}
      />
      <input
        type="text"
        class="input"
        placeholder="Topic title"
        name="title"
        required
      />
      <Button type="submit">Create topic</Button>
    </form>
  );
}
