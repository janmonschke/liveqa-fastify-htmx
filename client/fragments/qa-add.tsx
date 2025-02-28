import { Type, Static } from "@fastify/type-provider-typebox";
import { FastifySchema } from "fastify";
import { RouteProps } from "../../types";
import { db } from "../db";
import { qaAdmin } from "../urls";
import { ErrorMessage } from "../components/ErrorMessage";

const bodySchema = Type.Object({
  title: Type.String({ minLength: 1 }),
  hostId: Type.String({ minLength: 1 }),
});
export const attachValidation = true;

export const path = "/qa/add";
export const method = "POST";

export const schema: FastifySchema = {
  body: bodySchema,
};

type Props = RouteProps<{ Body: Static<typeof bodySchema> }>;

export default async ({ req, reply }: Props) => {
  if (req.validationError?.message) {
    reply.header("HX-Retarget", "#host-errormessage");
    return <ErrorMessage message={req.validationError.message} />;
  }
  const { title, hostId } = req.body;
  const qa = await db.qA.create({
    data: {
      title,
      hostId,
      QAConfig: {
        create: {
          areVotesEnabled: true,
        },
      },
    },
  });
  reply.header("HX-Redirect", qaAdmin(qa.id));
  return "";
};
