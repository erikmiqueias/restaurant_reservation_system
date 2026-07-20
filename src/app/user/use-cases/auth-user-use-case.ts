import { GenericAuthError } from "../errors/user.error.js";
import { AuthUserInDTO, AuthUserOutDTO } from "../ports/in/auth-user-in.js";
import { HashProvider } from "../ports/out/providers/hash-provider.js";
import { UserRepository } from "../ports/out/repositories/user.interface.js";

export class AuthUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProvider,
  ) {}
  async execute(userCredentials: AuthUserInDTO): Promise<AuthUserOutDTO> {
    const userExists = await this.userRepository.getUserByEmail(
      userCredentials.email,
    );

    if (!userExists) throw new GenericAuthError();

    const isValidPassword = await this.hashProvider.verify(
      userCredentials.password,
      userExists.password,
    );

    if (!isValidPassword) throw new GenericAuthError();

    return {
      id: userExists.id,
      username: userExists.username,
      email: userExists.email,
      role: userExists.role,
    };
  }
}
