import { UpdateTableUseCase } from "../../../app/tables/use-cases/update-table.use-case.js";
import { PrismaReservationRepository } from "../../../infra/database/reservation/repositories/prisma-reservation.repo.js";
import { PrismaTableRepository } from "../../../infra/database/table/repositories/prisma-table.repo.js";

export const makeUpdateTable = () => {
  const prismaTableRepository = new PrismaTableRepository();
  const prismaReservationRepository = new PrismaReservationRepository();
  const updateTableUseCase = new UpdateTableUseCase(
    prismaTableRepository,
    prismaReservationRepository,
  );

  return updateTableUseCase;
};
