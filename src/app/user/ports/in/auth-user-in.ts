import { Role } from "../../../../domain/user/entities/user.js";

export type AuthUserInDTO = {
  email: string;
  password: string;
};

export type AuthUserOutDTO = {
  id: string;
  username: string;
  email: string;
  role: Role;
};
