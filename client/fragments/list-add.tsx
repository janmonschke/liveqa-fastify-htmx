import { Type, Static } from "@fastify/type-provider-typebox";
import { FastifySchema } from "fastify";
import { RedirectToWithoutHx, RouteProps } from "../../types";
import { ListItem } from "../components/ListItem";

const bodySchema = Type.Object({
  inputValue: Type.String(),
});

export const path = "/list/add";
export const method = "POST";
export const redirectToWithoutHx: RedirectToWithoutHx = "/data";

export const schema: FastifySchema = {
  body: bodySchema,
};

type Props = RouteProps<{ Body: Static<typeof bodySchema> }>;

export default ({ app, req, reply }: Props) => {
  app.db.todoList.push(req.body.inputValue);
  return <ListItem>{req.body.inputValue}</ListItem>;
};
