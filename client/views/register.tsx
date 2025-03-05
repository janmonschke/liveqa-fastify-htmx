import { RegisterForm } from "../components/auth/RegisterForm";
import { redirectIfLoggedin } from "../jwt.server";

export const path = "/register";
export const preHandler = redirectIfLoggedin('host');

export default function Login() {
  return <RegisterForm />;
}
