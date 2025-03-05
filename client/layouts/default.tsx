import { PropsWithChildren } from "@kitajs/html";
import { ToastContainer } from "../components/Toast";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div class="contents">
      {children}
      <ToastContainer />
    </div>
  );
}
