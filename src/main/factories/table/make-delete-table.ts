import { DeleteTableUseCase } from "../../../app/tables/use-cases/delete-table.use-case.js";
import { PrismaReservationRepository } from "../../../infra/database/reservation/repositories/prisma-reservation.repo.js";
import { PrismaTableRepository } from "../../../infra/database/table/repositories/prisma-table.repo.js";

export const makeDeleteTable = () => {
  const tableRepository = new PrismaTableRepository();
  const prismaReservationRepository = new PrismaReservationRepository();
  const deleteTableUseCase = new DeleteTableUseCase(
    tableRepository,
    prismaReservationRepository,
  );

  return deleteTableUseCase;
};
