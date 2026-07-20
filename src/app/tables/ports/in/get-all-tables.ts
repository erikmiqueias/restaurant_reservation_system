import { TableStatus } from "../../../../domain/table/entities/table.js";

export type GetAllTalbesInDTO = never;

export type GetAllTablesOutDTO = {
  id: string;
  tableNumber: number;
  capacity: number;
  status: TableStatus;
  createdAt: Date;
};
