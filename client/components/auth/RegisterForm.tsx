import { AuthForm } from "./AuthForm";

export function RegisterForm({ error }: { error?: string }) {
  return (
    <AuthForm
      headline="Register"
      actionLabel="Register"
      action="auth/register"
      error={error}
    />
  );
}
