import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { getAllReservationsResponseSchema } from "../../schemas/reservation/reservation.schema.js";
import { makeGetAllReservationsByUserId } from "../../../../main/factories/reservation/get-all-reservations-by-user-id.js";

type GetAllReservationsByUserIdResponseSchema = z.infer<
  typeof getAllReservationsResponseSchema
>;
export class GetAllReservationsByUserIdController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply<{ Reply: GetAllReservationsByUserIdResponseSchema }>,
  ) {
    const loggedUserId = req.user.sub;

    const getAllReservationsByUserIdUseCase = makeGetAllReservationsByUserId();
    const reservations =
      await getAllReservationsByUserIdUseCase.execute(loggedUserId);

    return reply.status(200).send(reservations);
  }
}
