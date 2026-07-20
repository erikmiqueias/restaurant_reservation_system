import { UserRepository } from "../../../../app/user/ports/out/repositories/user.interface.js";
import { User } from "../../../../domain/user/entities/user.js";
import client from "../../prisma/db.js";

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await client.user.create({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        createdAt: user.createdAt,
      },
    });

    return User.restore(
      {
        username: createdUser.username,
        email: createdUser.email,
        password: createdUser.password,
        role: createdUser.role,
        createdAt: createdUser.createdAt,
      },
      createdUser.id,
    );
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return User.restore(
      {
        ...user,
      },
      user.id,
    );
  }
  async getUserById(id: string): Promise<User | null> {
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return User.restore(
      {
        ...user,
      },
      user.id,
    );
  }
}
