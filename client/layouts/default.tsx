import { PropsWithChildren } from "@kitajs/html";
import { ToastContainer } from "../components/Toast";

import styles from "./default.module.css";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div class={styles.Contents}>
      <div class="container">{children}</div>
      <ToastContainer />
    </div>
  );
}
