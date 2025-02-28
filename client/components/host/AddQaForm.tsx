export function AddQaForm({ hostId }: { hostId: string }) {
  return (
    <form action="/qa/add" method="post" hx-boost="true" hx-replace-url="false">
      <h2>New QA</h2>

      <input type="text" placeholder="QA title" name="title" required />
      <input type="hidden" name="hostId" value={hostId} />
      <button type="submit">Create QA</button>
    </form>
  );
}
