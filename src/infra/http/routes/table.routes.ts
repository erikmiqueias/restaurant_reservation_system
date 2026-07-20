import { ZodTypeProvider } from "@fastify/type-provider-zod";
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../hooks/verify-jwt.js";
import {
  createTableBodySchema,
  createTableResponseSchema,
  getAllTablesResponseSchema,
  updateTableBodySchema,
  updateTableParamsSchema,
  updateTableResponseSchema,
} from "../schemas/table/table.schema.js";
import { errorSchema } from "../schemas/error.schema.js";
import { CreateTableController } from "../controller/table/create-table.js";
import { verifyRole } from "../hooks/verify-role.js";
import z from "zod";
import { GetAllTablesController } from "../controller/table/get-all-tables.js";
import { UpdateTableController } from "../controller/table/update-table.js";
import { DeleteTableController } from "../controller/table/delete-table.js";

export const tableRoutes = async (app: FastifyInstance) => {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.route({
    method: "POST",
    preHandler: [verifyJwt, verifyRole("ADMIN")],
    url: "/tables",
    schema: {
      tags: ["Table"],
      summary: "Create a table",
      description:
        "Create a table with the given table number, capacity and status.",
      body: createTableBodySchema,
      response: {
        201: createTableResponseSchema,
        400: errorSchema,
        401: errorSchema,
        409: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const controller = new CreateTableController();
      return controller.handle(request, reply);
    },
  });
  typedApp.route({
    method: "GET",
    preHandler: [verifyJwt],
    url: "/tables",
    schema: {
      tags: ["Table"],
      summary: "Get all tables",
      description: "Get all tables and their details.",
      response: {
        200: getAllTablesResponseSchema,
        401: errorSchema,
        500: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const controller = new GetAllTablesController();
      return controller.handle(request, reply);
    },
  });
  typedApp.route({
    method: "PATCH",
    preHandler: [verifyJwt, verifyRole("ADMIN")],
    url: "/tables/:id",
    schema: {
      tags: ["Table"],
      summary: "Update a table",
      description:
        "Update a table with the given table number, capacity and status.",
      body: updateTableBodySchema,
      response: {
        200: updateTableResponseSchema,
        400: errorSchema,
        401: errorSchema,
        404: errorSchema,
        409: errorSchema,
        500: errorSchema,
      },
      params: updateTableParamsSchema,
    },
    handler: async (request, reply) => {
      const controller = new UpdateTableController();
      return controller.handle(request, reply);
    },
  });
  typedApp.route({
    method: "DELETE",
    preHandler: [verifyJwt, verifyRole("ADMIN")],
    url: "/tables/:id",
    schema: {
      tags: ["Table"],
      summary: "Delete a table",
      description: "Delete a table.",
      params: z.object({
        id: z.uuid({
          error: "Invalid id format.",
        }),
      }),
      response: {
        204: z.null(),
        401: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
    },
    handler: async (req, res) => {
      const controller = new DeleteTableController();
      return await controller.handle(req, res);
    },
  });
};
