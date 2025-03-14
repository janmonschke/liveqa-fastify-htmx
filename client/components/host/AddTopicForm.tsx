import type { Topic } from "@prisma/client";
import { qaTopicCrud } from "../../urls";

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
      <input type="text" placeholder="Topic title" name="title" required />
      <button type="submit">Create topic</button>
    </form>
  );
}
