import { Role } from "../../../../domain/user/entities/user.js";

export type CreateUserInDTO = {
  username: string;
  email: string;
  password: string;
  role: Role;
};

export type CreateUserOutDTO = {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: Date;
};
