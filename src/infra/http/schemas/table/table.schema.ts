import { TableStatus } from "@prisma/client";
import z from "zod";

export const createTableBodySchema = z.object({
  tableNumber: z.int().min(1, {
    error: "Table number must be a positive integer.",
  }),
  capacity: z
    .int()
    .min(1, {
      error: "Capacity must be a positive integer.",
    })
    .max(8, {
      error: "Capacity must be less than or equal to 8.",
    }),
  status: z.enum(TableStatus, {
    error: "Status must be among the available options (ACTIVE, MAINTENANCE).",
  }),
});

export const createTableResponseSchema = createTableBodySchema.clone().extend({
  id: z.uuid(),
  createdAt: z.date(),
});

export const getAllTablesResponseSchema = z.array(
  createTableBodySchema.extend({
    id: z.uuid(),
    createdAt: z.date(),
  }),
);

export const updateTableBodySchema = createTableBodySchema.clone().partial({
  tableNumber: true,
  capacity: true,
  status: true,
});
export const updateTableResponseSchema = createTableBodySchema.clone().extend({
  id: z.uuid(),
  updatedAt: z.date().optional().nullable(),
});
export const updateTableParamsSchema = z.object({
  id: z.uuid(),
});

export const deleteTableParamsSchema = z.object({
  id: z.uuid({
    error: "Invalid id format.",
  }),
});
