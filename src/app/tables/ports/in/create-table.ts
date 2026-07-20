import { TableStatus } from "../../../../domain/table/entities/table.js";

export type CreateTableInDTO = {
  tableNumber: number;
  capacity: number;
  status: TableStatus;
};

export type CreateTableOutDTO = {
  id: string;
  tableNumber: number;
  capacity: number;
  status: TableStatus;
  createdAt: Date;
};
