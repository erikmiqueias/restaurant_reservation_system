import { FastifyReply, FastifyRequest } from "fastify";
import { getAllTablesResponseSchema } from "../../schemas/table/table.schema.js";
import z from "zod";
import { makeGetAllTables } from "../../../../main/factories/table/make-get-all-tables.js";

type GetAllTablesResponseSchema = z.infer<typeof getAllTablesResponseSchema>;

export class GetAllTablesController {
  async handle(
    _: FastifyRequest,
    reply: FastifyReply<{ Reply: GetAllTablesResponseSchema }>,
  ) {
    const getAllTablesUseCase = makeGetAllTables();

    const tables = await getAllTablesUseCase.execute();
    return reply.status(200).send(tables);
  }
}
