import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import {
  createTableBodySchema,
  createTableResponseSchema,
} from "../../schemas/table/table.schema.js";
import { makeCreateTable } from "../../../../main/factories/table/make-create-table.js";

type CreateTableBodySchema = z.infer<typeof createTableBodySchema>;
type CreateTableResponseSchema = z.infer<typeof createTableResponseSchema>;

export class CreateTableController {
  async handle(
    req: FastifyRequest<{ Body: CreateTableBodySchema }>,
    reply: FastifyReply<{ Reply: CreateTableResponseSchema }>,
  ) {
    const body = req.body;

    const createTableUseCase = makeCreateTable();

    const table = await createTableUseCase.execute(body);

    return reply.status(201).send(table);
  }
}
