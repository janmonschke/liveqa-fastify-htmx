import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from "fastify";

interface RedirectToWithoutHxArguments<
  RouteInterface extends RouteGenericInterface = RouteGenericInterface
> {
  app: FastifyInstance;
  req: FastifyRequest<RouteInterface>;
}

export type RedirectToWithoutHxFunction<
  RouteInterface extends RouteGenericInterface = RouteGenericInterface
> = (args: RedirectToWithoutHxArguments<RouteInterface>) => string;

export type RedirectToWithoutHx<
  RouteInterface extends RouteGenericInterface = RouteGenericInterface
> = string | RedirectToWithoutHxFunction<RouteInterface>;

export interface RouteProps<
  RouteInterface extends RouteGenericInterface = RouteGenericInterface
> {
  app: FastifyInstance;
  req: FastifyRequest<RouteInterface>;
  reply: FastifyReply;
}
