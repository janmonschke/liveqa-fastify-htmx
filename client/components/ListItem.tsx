import type { PropsWithChildren } from "@kitajs/html"
import styles from "./ListItem.module.css"

export function ListItem({ children }: PropsWithChildren) {
  return (
    <li class={styles.ListItem} safe>
      {children}
    </li>
  );
}
