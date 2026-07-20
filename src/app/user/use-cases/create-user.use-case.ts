import { User } from "../../../domain/user/entities/user.js";
import { UserAlreadyExistsError } from "../errors/user.error.js";
import {
  CreateUserInDTO,
  CreateUserOutDTO,
} from "../ports/in/create-user-in.js";
import { HashProvider } from "../ports/out/providers/hash-provider.js";
import { UserRepository } from "../ports/out/repositories/user.interface.js";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}
  async execute(user: CreateUserInDTO): Promise<CreateUserOutDTO> {
    const userExists = await this.userRepository.getUserByEmail(user.email);

    if (userExists) throw new UserAlreadyExistsError();

    const newUser = User.create({
      username: user.username,
      email: user.email,
      password: await this.hashProvider.hash(user.password),
      role: user.role,
    });

    await this.userRepository.create(newUser);

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };
  }
}
