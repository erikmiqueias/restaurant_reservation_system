import { TableStatus } from "../../../../domain/table/entities/table.js";

export type UpdateTableInDTO = {
  tableNumber: number;
  capacity: number;
  status: TableStatus;
};

export type UpdateTableOutDTO = {
  id: string;
  tableNumber: number;
  capacity: number;
  status: TableStatus;
  updatedAt: Date;
};
