import z from "zod";
import { deleteTableParamsSchema } from "../../schemas/table/table.schema.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteTable } from "../../../../main/factories/table/make-delete-table.js";

type DeleteTableParamsSchema = z.infer<typeof deleteTableParamsSchema>;

export class DeleteTableController {
  async handle(
    request: FastifyRequest<{ Params: DeleteTableParamsSchema }>,
    reply: FastifyReply,
  ) {
    const tableId = request.params.id;

    const deleteTableUseCase = makeDeleteTable();

    await deleteTableUseCase.execute(tableId);

    return reply.status(204).send();
  }
}
