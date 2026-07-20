import { ReservationStatus } from "@prisma/client";
import z from "zod";

export const createReservationBodySchema = z.object({
  startTime: z.coerce.date({
    error: "Invalid start time format.",
  }),
  endTime: z.coerce.date({
    error: "Invalid end time format.",
  }),
  guestCount: z
    .number({
      error: "Guest count must be a integer.",
    })
    .positive({
      error: "Guest count must be a positive integer.",
    })
    .min(1, {
      error: "Guest count must be greater than 0.",
    })
    .max(8, {
      error: "Guest count must be less than or equal to 8.",
    }),
});

export const createReservationResponseSchema = createReservationBodySchema
  .clone()
  .extend({
    id: z.uuid(),
    tableId: z.uuid(),
    tableNumber: z.number(),
    status: z.enum(ReservationStatus, {
      error:
        "Status must be among the available options (ACTIVE, CANCELED, COMPLETED).",
    }),
  });

export const createReservationParamsSchema = z.object({
  tableId: z.uuid({
    error: "Invalid table id format.",
  }),
});

export const getAllReservationsResponseSchema = z.array(
  createReservationResponseSchema.clone(),
);

export const cancelReservationParamsSchema = z.object({
  reservationId: z.uuid({
    error: "Invalid reservation id format.",
  }),
});
