import { CreateUserUseCase } from "../../../app/user/use-cases/create-user.use-case.js";
import { PrismaUserRepository } from "../../../infra/database/user/repositories/prisma-user.repo.js";
import { BcryptHashProvider } from "../../../infra/providers/bcrypt-hash-provider.js";

export const makeCreateUser = () => {
  const bcryptHashProvider = new BcryptHashProvider();
  const userRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    bcryptHashProvider,
  );

  return createUserUseCase;
};
