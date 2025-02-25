import { PropsWithChildren } from "@kitajs/html";
import styles from "./CenteredMediumContainer.module.css";

export function CenteredMediumContainer({
  children,
  id,
}: PropsWithChildren<{ id: string }>) {
  return (
    <section class={styles.Container} id={id}>
      <div class={styles.ContainerContent}>{children}</div>
    </section>
  );
}
