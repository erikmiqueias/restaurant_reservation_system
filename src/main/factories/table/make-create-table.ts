import { CreateTableUseCase } from "../../../app/tables/use-cases/create-table.use-case.js";
import { PrismaTableRepository } from "../../../infra/database/table/repositories/prisma-table.repo.js";

export const makeCreateTable = () => {
  const prismaTableRepository = new PrismaTableRepository();
  const createTableUseCase = new CreateTableUseCase(prismaTableRepository);

  return createTableUseCase;
};
