import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { cancelReservationParamsSchema } from "../../schemas/reservation/reservation.schema.js";
import { makeCancelReservation } from "../../../../main/factories/reservation/cancel-reservation.js";

type CancelReservationParamsSchema = z.infer<
  typeof cancelReservationParamsSchema
>;

export class CancelReservationController {
  async handle(
    req: FastifyRequest<{ Params: CancelReservationParamsSchema }>,
    reply: FastifyReply,
  ) {
    const loggedUserId = req.user.sub;
    const reservationId = req.params.reservationId;

    const cancelReservationUseCase = makeCancelReservation();
    await cancelReservationUseCase.execute({
      reservationId,
      userId: loggedUserId,
    });
    return reply.status(204).send();
  }
}
