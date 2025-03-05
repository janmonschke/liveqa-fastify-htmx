import { LoginForm } from "../components/auth/LoginForm";
import { redirectIfLoggedin } from "../jwt.server";

export const path = "/login";
export const preHandler = redirectIfLoggedin('host');

export default function Login() {
  return <LoginForm />;
}
