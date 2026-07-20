import { GetAllReservationsByUserIdUseCase } from "../../../app/reservation/use-cases/get-all-reservations-by-user-id.use-case.js";
import { PrismaReservationRepository } from "../../../infra/database/reservation/repositories/prisma-reservation.repo.js";
import { PrismaUserRepository } from "../../../infra/database/user/repositories/prisma-user.repo.js";

export const makeGetAllReservationsByUserId = () => {
  const prismaUserRepository = new PrismaUserRepository();
  const prismaReservationRepository = new PrismaReservationRepository();
  const getAllReservationsByUserIdUseCase =
    new GetAllReservationsByUserIdUseCase(
      prismaReservationRepository,
      prismaUserRepository,
    );

  return getAllReservationsByUserIdUseCase;
};
