import { CreateReservationUseCase } from "../../../app/reservation/use-cases/create-reservation.use-case.js";
import { PrismaReservationRepository } from "../../../infra/database/reservation/repositories/prisma-reservation.repo.js";
import { PrismaTableRepository } from "../../../infra/database/table/repositories/prisma-table.repo.js";

export const makeCreateReservation = () => {
  const prismaReservationRepository = new PrismaReservationRepository();
  const prismaTableRepository = new PrismaTableRepository();
  const createReservationUseCase = new CreateReservationUseCase(
    prismaReservationRepository,
    prismaTableRepository,
  );

  return createReservationUseCase;
};
