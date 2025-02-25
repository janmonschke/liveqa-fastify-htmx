import { AuthForm } from "./AuthForm";

export function LoginForm({ error }: { error?: string }) {
  return (
    <AuthForm
      headline="Login"
      actionLabel="Login"
      action="auth/login"
      error={error}
    />
  );
}
