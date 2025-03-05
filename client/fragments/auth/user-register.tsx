import { Type, Static } from "@fastify/type-provider-typebox";
import { FastifySchema } from "fastify";
import { RouteProps } from "../../../types";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { db } from "../../db.server";
import { generatePasswordHash } from "../../password.server";

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

export default async function UserRegisterFragment({ req, reply }: Props) {
  if (req.validationError) {
    return <RegisterForm error={req.validationError?.message} />;
  } else {
    const { username, password } = req.body;
    const passwordHash = await generatePasswordHash(password);
    await db.host.create({
      data: {
        name: username,
        passwordHash,
      },
    });
    reply.header("HX-Redirect", "/login");
  }
}
