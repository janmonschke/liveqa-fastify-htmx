import { PropsWithChildren } from "@kitajs/html";

export default function Layout({ children }: PropsWithChildren) {
  return <div class="contents">{children}</div>;
}
