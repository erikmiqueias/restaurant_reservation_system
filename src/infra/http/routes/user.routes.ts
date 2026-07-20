import { ZodTypeProvider } from "@fastify/type-provider-zod";
import { FastifyInstance } from "fastify";
import z from "zod";
import {
  authUserBodySchema,
  authUserResponseSchema,
  createUserBodySchema,
  createUserResponseSchema,
} from "../schemas/user/user.schema.js";
import { errorSchema } from "../schemas/error.schema.js";
import { CreateUserController } from "../controller/user/create-user.js";
import { AuthUserController } from "../controller/user/auth-user.js";
import { RefreshTokenController } from "../controller/user/refresh-token.js";

export const userRoutes = (app: FastifyInstance) => {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  typedApp.route({
    method: "POST",
    url: "/user/register",
    schema: {
      tags: ["User"],
      summary: "Register a user",
      description: "Register a user using the email, password and role.",
      body: createUserBodySchema,
      response: {
        201: createUserResponseSchema,
        400: errorSchema,
        409: errorSchema,
        500: errorSchema,
      },
    },
    handler: async (req, res) => {
      const controller = new CreateUserController();
      return await controller.handle(req, res);
    },
  });
  typedApp.route({
    method: "POST",
    url: "/user/login",
    schema: {
      tags: ["User"],
      summary: "Login a user",
      description: "Login a user using the email and password.",
      externalDocs: {
        url: "https://github.com/fastify/fastify-jwt",
        description: "Fastify-jwt documentation",
      },
      body: authUserBodySchema,
      response: {
        200: authUserResponseSchema,
        400: errorSchema,
        401: errorSchema,
        403: errorSchema,
        500: errorSchema,
      },
    },
    handler: async (req, res) => {
      const controller = new AuthUserController();
      return await controller.handle(req, res);
    },
  });
  typedApp.route({
    method: "PATCH",
    url: "/user/refresh",
    schema: {
      tags: ["User"],
      summary: "Refreshes the access token",
      description:
        "Generates a new access token using the refresh token with the strategy of the token rotation.",
      externalDocs: {
        url: "https://github.com/fastify/fastify-jwt",
        description: "Fastify-jwt documentation",
      },
      response: {
        200: z.object({
          accessToken: z.jwt(),
        }),
        401: errorSchema,
        403: errorSchema,
        500: errorSchema,
      },
    },
    handler: async (req, res) => {
      const controller = new RefreshTokenController();
      return await controller.handle(req, res);
    },
  });
};
