import { ZodTypeProvider } from "@fastify/type-provider-zod";
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../hooks/verify-jwt.js";
import {
  cancelReservationParamsSchema,
  createReservationBodySchema,
  createReservationParamsSchema,
  createReservationResponseSchema,
  getAllReservationsResponseSchema,
} from "../schemas/reservation/reservation.schema.js";
import { errorSchema } from "../schemas/error.schema.js";
import { CreateReservationController } from "../controller/reservation/create-reservation.js";
import { GetAllReservationsByUserIdController } from "../controller/reservation/get-all-reservations-by-user-id.js";
import z from "zod";
import { CancelReservationController } from "../controller/reservation/cancel-reservation.js";

export const reservationRoutes = (app: FastifyInstance) => {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.route({
    method: "POST",
    preHandler: [verifyJwt],
    url: "/reservations/:tableId",
    schema: {
      tags: ["Reservation"],
      summary: "Create a reservation",
      description: "Create a reservation for a table.",
      body: createReservationBodySchema,
      params: createReservationParamsSchema,
      response: {
        201: createReservationResponseSchema,
        400: errorSchema,
        401: errorSchema,
        409: errorSchema,
        500: errorSchema,
      },
    },
    handler: async (req, res) => {
      const controller = new CreateReservationController();
      return await controller.handle(req, res);
    },
  });
  typedApp.route({
    method: "GET",
    preHandler: [verifyJwt],
    url: "/reservations",
    schema: {
      tags: ["Reservation"],
      summary: "Get all reservations",
      description: "Get all reservation from the logged user.",
      response: {
        200: getAllReservationsResponseSchema,
        401: errorSchema,
        500: errorSchema,
      },
    },
    handler: async (req, res) => {
      const controller = new GetAllReservationsByUserIdController();
      return await controller.handle(req, res);
    },
  });
  typedApp.route({
    method: "PATCH",
    preHandler: [verifyJwt],
    url: "/reservations/:reservationId/cancel",
    schema: {
      tags: ["Reservation"],
      summary: "Cancel a reservation",
      description: "Cancel a reservation from the logged user.",
      params: cancelReservationParamsSchema,
      response: {
        204: z.null(),
        401: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
    },
    handler: async (req, res) => {
      const controller = new CancelReservationController();
      return await controller.handle(req, res);
    },
  });
};
