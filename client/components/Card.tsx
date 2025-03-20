import type { PropsWithChildren } from "@kitajs/html";

export function Card({
  children,
  klass = "",
}: PropsWithChildren & { klass?: string }) {
  return (
    <div class="card">
      <div class={["card-content px-3 py-3", klass]}>{children}</div>
    </div>
  );
}
