import { Type, Static } from "@fastify/type-provider-typebox";
import { FastifySchema } from "fastify";
import { RouteProps } from "../../../types";
import { RegisterForm } from "../../components/auth/RegisterForm";

const bodySchema = Type.Object({
  username: Type.String({ minLength: 3 }),
  password: Type.String({ minLength: 4 }),
});

export const method = "post";
export const path = "/auth/register";

export const schema: FastifySchema = {
  body: bodySchema,
};
export const attachValidation = true;

type Props = RouteProps<{ Body: Static<typeof bodySchema> }>;

export default function UserRegisterFragment({ req }: Props) {
  return <RegisterForm error={req.validationError?.message} />;
}
