import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import {
  GenericAuthError,
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../app/user/errors/user.error.js";
import {
  TableAlreadyExistsError,
  TableCapacityNotAvailableError,
  TableHasReservationsError,
  TableNotFoundError,
  TableNumberAlreadyExistsError,
  TableNumberNotAvailableError,
} from "../app/tables/errors/table.error.js";
import {
  ReservationAlreadyExistsError,
  ReservationGuestCountExceedsCapacityError,
  ReservationInPastError,
  ReservationOutOfRangeError,
  ReservationStartTimeConflictError,
  ReservationStartTimeInPastError,
  ReservationTableConflictError,
  ReservationTooFarInFutureError,
} from "../app/reservation/errors/reservation.error.js";

export const errorHandler = async (
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error.code === "FST_ERR_VALIDATION") {
    const cleanMessage = error.validation
      ? error.validation[0].message
      : "Validation error";

    return reply.status(400).send({
      code: "INVALID_INPUT",
      message: cleanMessage,
    });
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof UserNotFoundError) {
    return reply.status(404).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof GenericAuthError) {
    return reply.status(401).send({
      code: error.name,
      message: error.message,
    });
  }

  // Table
  if (error instanceof TableCapacityNotAvailableError) {
    return reply.status(400).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof TableAlreadyExistsError) {
    return reply.status(409).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof TableNotFoundError) {
    return reply.status(404).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof TableNumberNotAvailableError) {
    return reply.status(400).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof TableNumberAlreadyExistsError) {
    return reply.status(409).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof TableHasReservationsError) {
    return reply.status(409).send({
      code: error.name,
      message: error.message,
    });
  }

  // Reservation
  if (error instanceof ReservationStartTimeConflictError) {
    return reply.status(400).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof ReservationStartTimeInPastError) {
    return reply.status(400).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof ReservationAlreadyExistsError) {
    return reply.status(409).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof ReservationInPastError) {
    return reply.status(400).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof ReservationTooFarInFutureError) {
    return reply.status(400).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof ReservationOutOfRangeError) {
    return reply.status(400).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof ReservationGuestCountExceedsCapacityError) {
    return reply.status(400).send({
      code: error.name,
      message: error.message,
    });
  }

  if (error instanceof ReservationTableConflictError) {
    return reply.status(409).send({
      code: error.name,
      message: error.message,
    });
  }

  return reply.status(500).send({
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error.",
  });
};
