import { AuthUserUseCase } from "../../../app/user/use-cases/auth-user-use-case.js";
import { PrismaUserRepository } from "../../../infra/database/user/repositories/prisma-user.repo.js";
import { BcryptHashProvider } from "../../../infra/providers/bcrypt-hash-provider.js";

export const makeAuthUser = () => {
  const bcryptHashProvider = new BcryptHashProvider();
  const prismaUserRepository = new PrismaUserRepository();
  const authUserUseCase = new AuthUserUseCase(
    prismaUserRepository,
    bcryptHashProvider,
  );

  return authUserUseCase;
};
