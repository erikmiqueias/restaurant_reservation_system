import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "@fastify/type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifyApiReference from "@scalar/fastify-api-reference";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env.js";
import fastifyCookie from "@fastify/cookie";
import { errorHandler } from "../infra/error-handler.js";
import { userRoutes } from "../infra/http/routes/user.routes.js";
import { tableRoutes } from "../infra/http/routes/table.routes.js";
import { reservationRoutes } from "../infra/http/routes/reservation.routes.js";
import { healthCheckRoutes } from "../infra/http/routes/health-check.routes.js";

export const buildApp = async () => {
  const app = fastify({
    logger: true,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Restaurant Reservation System",
        description:
          "Complete API documentation for the Restaurant Reservation System. Personal study project.",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
          description: "Development server",
        },
      ],
      tags: [
        {
          name: "User",
          description: "User related endpoints",
        },
        {
          name: "Table",
          description: "Table related endpoints",
        },
        {
          name: "Reservation",
          description: "Reservation related endpoints",
        },
        {
          name: "Health Check",
          description: "Health check endpoints",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  await app.register(fastifyApiReference, {
    routePrefix: "/docs",
    logLevel: "info",
  });

  await app.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
    algorithm: "sha512",
  });

  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  app.setErrorHandler(errorHandler);

  await app.register(userRoutes, { prefix: "/api/v1" });
  await app.register(tableRoutes, { prefix: "/api/v1" });
  await app.register(reservationRoutes, { prefix: "/api/v1" });
  await app.register(healthCheckRoutes);

  return app;
};
