import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import styles from "./AuthForm.module.css";

type Props = {
  action: "auth/login" | "auth/register";
  actionLabel: string;
  headline: string;
  error?: string;
};
export function AuthForm({ action, actionLabel, headline, error }: Props) {
  return (
    <section id="authform" class={styles.AuthForm}>
      <h1 class="title is-1" safe>
        {headline}
      </h1>
      <form
        method="post"
        action={action}
        hx-boost="true"
        hx-replace-url="false"
        hx-target="#authform"
        hx-disabled-elt="input, button"
        hx-indicator="find button"
      >
        <div class="field">
          <label for="username" class="label">
            Username:
          </label>
          <input
            type="text"
            name="username"
            required
            minlength={3}
            class="input"
            id="username-input"
            hx-preserve="true"
          />
        </div>
        <div class="field">
          <label for="password" class="label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            autocomplete="current-password"
            required
            minlength={1}
            class="input"
            id="password-input"
            hx-preserve="true"
          />
        </div>
        {error && <ErrorMessage message={error} />}

        <div class="field is-grouped">
          <div class="control">
            <Button variant="primary" safe>
              {actionLabel}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
