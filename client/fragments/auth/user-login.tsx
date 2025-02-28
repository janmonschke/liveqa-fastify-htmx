import { Type, Static } from "@fastify/type-provider-typebox";
import { FastifySchema } from "fastify";
import { RouteProps } from "../../../types";
import { LoginForm } from "../../components/auth/LoginForm";
import { db } from "../../db";
import { comparePasswordAndHash } from "../../password";
import { signTokenAndSetCookie, TokenContent } from "../../views/jwt";

const bodySchema = Type.Object({
  username: Type.String({ minLength: 3 }),
  password: Type.String({ minLength: 4 }),
});

export const method = "post";
export const path = "/auth/login";

export const schema: FastifySchema = {
  body: bodySchema,
};
export const attachValidation = true;

type Props = RouteProps<{ Body: Static<typeof bodySchema> }>;

export default async function UserLoginFragment({ app, req, reply }: Props) {
  if (req.validationError) {
    return <LoginForm error={req.validationError?.message} />;
  }

  const { username, password } = req.body;
  const user = await db.host.findUnique({
    where: {
      name: username,
    },
  });

  const isCorrectPassword =
    user &&
    (await comparePasswordAndHash(password.toString(), user.passwordHash));

  if (!user || !isCorrectPassword) {
    return <FormWithGenericError />;
  } else {
    const tokenContent: TokenContent = {
      id: user.id,
      name: user.name,
    };
    signTokenAndSetCookie(tokenContent, app, reply);

    reply.header("HX-Redirect", "/host");
  }
}

function FormWithGenericError() {
  return <LoginForm error="Incorrect username or password" />;
}
