import type { QAConfig } from "@prisma/client";

export default function ({ qaConfig }: { qaConfig: QAConfig }) {
  return (
    <form
      method="post"
      action={`/qa/admin/${qaConfig.qaId}/config`}
      hx-boost="true"
      hx-replace-url="false"
      hx-trigger="change"
      hx-target="this"
      hx-swap="outerHTML"
    >
      <label class="checkbox">
        <input
          type="checkbox"
          class="mr-1"
          checked={qaConfig.areVotesEnabled}
          name="areVotesEnabled"
        />
        <span class="checkable">voting enabled</span>
      </label>
    </form>
  );
}
