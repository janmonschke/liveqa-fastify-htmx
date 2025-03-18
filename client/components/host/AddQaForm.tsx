import { Button } from "../Button";

export function AddQaForm({ hostId }: { hostId: string }) {
  return (
    <form action="/qa/add" method="post" hx-boost="true" hx-replace-url="false">
      <h3 class="title is-5">Add a new QA</h3>
      <div class="field">
        <input
          class="input"
          type="text"
          placeholder="QA title"
          title="QA title"
          name="title"
          required
        />
        <input type="hidden" name="hostId" value={hostId} />
      </div>
      <div class="field">
        <Button type="submit" variant="primary">
          Create QA
        </Button>
      </div>
    </form>
  );
}
