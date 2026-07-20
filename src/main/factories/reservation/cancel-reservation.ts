import { CancelReservationUseCase } from "../../../app/reservation/use-cases/cancel-reservation.use-case.js";
import { PrismaReservationRepository } from "../../../infra/database/reservation/repositories/prisma-reservation.repo.js";

export const makeCancelReservation = () => {
  const prismaReservationRepository = new PrismaReservationRepository();
  const cancelReservationUseCase = new CancelReservationUseCase(
    prismaReservationRepository,
  );

  return cancelReservationUseCase;
};
