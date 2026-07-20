import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import {
  createReservationBodySchema,
  createReservationParamsSchema,
  createReservationResponseSchema,
} from "../../schemas/reservation/reservation.schema.js";
import { makeCreateReservation } from "../../../../main/factories/reservation/create-reservation.js";

type CreateReservationBodySchema = z.infer<typeof createReservationBodySchema>;
type CreateReservationResponseSchema = z.infer<
  typeof createReservationResponseSchema
>;
type CreateReservationParamsSchema = z.infer<
  typeof createReservationParamsSchema
>;

export class CreateReservationController {
  async handle(
    req: FastifyRequest<{
      Body: CreateReservationBodySchema;
      Params: CreateReservationParamsSchema;
    }>,
    reply: FastifyReply<{ Reply: CreateReservationResponseSchema }>,
  ) {
    const loggedUserId = req.user.sub;
    const tableId = req.params.tableId;
    const data = req.body;

    const createReservationUseCase = makeCreateReservation();

    const reservation = await createReservationUseCase.execute({
      tableId,
      userId: loggedUserId,
      ...data,
    });

    return reply.status(201).send(reservation);
  }
}
