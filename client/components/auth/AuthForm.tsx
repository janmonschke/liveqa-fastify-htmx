import { CenteredMediumContainer } from "../CenteredMediumContainer";
import styles from "./AuthForm.module.css";

type Props = {
  action: "auth/login" | "auth/register";
  actionLabel: string;
  headline: string;
  error?: string;
};
export function AuthForm({ action, actionLabel, headline, error }: Props) {
  const isLoading = false;
  return (
    <CenteredMediumContainer id="authform">
      <h1>{headline}</h1>
      <form
        method="post"
        action={action}
        hx-boost="true"
        hx-replace-url="false"
        hx-target="#authform"
      >
        <label for="username" class={styles.Label}>
          Username:
        </label>
        <input
          type="text"
          name="username"
          required
          minlength={3}
          disabled={isLoading}
          class={styles.Input}
          id="username-input"
          hx-preserve="true"
        />
        <label for="password" class={styles.Label}>
          Password:
        </label>
        <input
          type="password"
          name="password"
          autocomplete="current-password"
          required
          minlength={1}
          disabled={isLoading}
          class={styles.Input}
          id="password-input"
          hx-preserve="true"
        />
        {error && <p class={styles.Error}>{error}</p>}
        <button disabled={isLoading}>{actionLabel}</button>
      </form>
    </CenteredMediumContainer>
  );
}
