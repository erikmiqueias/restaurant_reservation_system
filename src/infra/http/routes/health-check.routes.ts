import { ZodTypeProvider } from "@fastify/type-provider-zod";
import { FastifyInstance } from "fastify";

export const healthCheckRoutes = (app: FastifyInstance) => {
  const typedRoute = app.withTypeProvider<ZodTypeProvider>();

  typedRoute.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Health Check"],
      description: "Health check endpoint",
    },
    handler: async (_, reply) => {
      reply.send({
        status: "API is running",
        message: `Access the API docs at http://localhost:${process.env.PORT}/docs`,
      });
    },
  });
};
