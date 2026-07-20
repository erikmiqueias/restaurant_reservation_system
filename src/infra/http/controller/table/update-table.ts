import { FastifyReply, FastifyRequest } from "fastify";
import {
  updateTableBodySchema,
  updateTableParamsSchema,
  updateTableResponseSchema,
} from "../../schemas/table/table.schema.js";
import z from "zod";
import { makeUpdateTable } from "../../../../main/factories/table/make-update-table.js";

type UpdateTableBodySchema = z.infer<typeof updateTableBodySchema>;
type UpdateTableResponseSchema = z.infer<typeof updateTableResponseSchema>;
type UpdateTableParamsSchema = z.infer<typeof updateTableParamsSchema>;

export class UpdateTableController {
  async handle(
    req: FastifyRequest<{
      Body: UpdateTableBodySchema;
      Params: UpdateTableParamsSchema;
    }>,
    reply: FastifyReply<{
      Reply: UpdateTableResponseSchema;
    }>,
  ) {
    const body = req.body;
    const tableId = req.params.id;

    console.log(body);
    console.log(tableId);

    const updateTableUseCase = makeUpdateTable();
    const table = await updateTableUseCase.execute(body, tableId);

    return reply.status(200).send(table);
  }
}
