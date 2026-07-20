import { Role } from "@prisma/client";
import z from "zod";

export const createUserBodySchema = z.object({
  username: z
    .string({
      error: "Username must be a string.",
    })
    .min(1, {
      error: "Username is required.",
    }),
  email: z
    .email({
      error: "Invalid email format.",
    })
    .min(1, {
      error: "Email is required.",
    }),
  password: z.string().min(8, {
    error: "Password must be at least 8 characters.",
  }),
  role: z.enum(Role, {
    error: "Role must be among the available options (CUSTOMER, ADMIN).",
  }),
});

export const createUserResponseSchema = createUserBodySchema
  .clone()
  .extend({
    id: z.uuid({
      error: "Id must be a valid cuid.",
    }),
    createdAt: z.date(),
  })
  .omit({
    password: true,
  });

export const authUserBodySchema = createUserBodySchema.pick({
  email: true,
  password: true,
});

export const authUserResponseSchema = createUserBodySchema
  .pick({
    username: true,
    email: true,
    role: true,
  })
  .extend({
    id: z.uuid(),
    accessToken: z.jwt(),
  });
