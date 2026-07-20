import { GetAllTablesUseCase } from "../../../app/tables/use-cases/get-all-tables.use-case.js";
import { PrismaTableRepository } from "../../../infra/database/table/repositories/prisma-table.repo.js";

export const makeGetAllTables = () => {
  const prismaTableRepository = new PrismaTableRepository();
  const getAllTablesUseCase = new GetAllTablesUseCase(prismaTableRepository);

  return getAllTablesUseCase;
};
