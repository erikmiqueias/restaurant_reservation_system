import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { createUserBodySchema } from "../../schemas/user/user.schema.js";
import { makeCreateUser } from "../../../../main/factories/user/make-create-user.js";

export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

export class CreateUserController {
  async handle(
    request: FastifyRequest<{ Body: CreateUserBodySchema }>,
    reply: FastifyReply,
  ) {
    const body = request.body;

    const createUserUseCase = makeCreateUser();

    const user = await createUserUseCase.execute(body);

    return reply.status(201).send(user);
  }
}
