import { TableRepository } from "../../../../app/tables/ports/out/repositories/table.interface.js";
import { Table } from "../../../../domain/table/entities/table.js";
import client from "../../prisma/db.js";

export class PrismaTableRepository implements TableRepository {
  async create(table: Table): Promise<Table> {
    const createdTable = await client.table.create({
      data: {
        id: table.id,
        tableNumber: table.tableNumber,
        capacity: table.capacity,
        status: table.status,
        createdAt: table.createdAt,
      },
    });

    return Table.restore(
      {
        capacity: createdTable.capacity,
        status: createdTable.status,
        createdAt: createdTable.createdAt,
        tableNumber: createdTable.tableNumber,
      },
      createdTable.id,
    );
  }
  async getTableByNumber(tableNumber: number): Promise<Table | null> {
    const table = await client.table.findUnique({
      where: {
        tableNumber,
      },
    });

    if (!table) return null;

    return Table.restore(
      {
        capacity: table.capacity,
        status: table.status,
        createdAt: table.createdAt,
        tableNumber: table.tableNumber,
      },
      table.id,
    );
  }
  async getTableById(id: string): Promise<Table | null> {
    const table = await client.table.findUnique({
      where: {
        id,
      },
    });

    if (!table) return null;

    return Table.restore(
      {
        capacity: table.capacity,
        status: table.status,
        createdAt: table.createdAt,
        tableNumber: table.tableNumber,
      },
      table.id,
    );
  }
  async getAllTables(): Promise<Table[]> {
    const tables = await client.table.findMany();

    return tables.map((table) => {
      return Table.restore(
        {
          capacity: table.capacity,
          status: table.status,
          createdAt: table.createdAt,
          tableNumber: table.tableNumber,
        },
        table.id,
      );
    });
  }
  async update(table: Table): Promise<Table> {
    const updatedTable = await client.table.update({
      where: {
        id: table.id,
      },
      data: {
        capacity: table.capacity,
        status: table.status,
        tableNumber: table.tableNumber,
      },
    });

    return Table.restore(
      {
        capacity: updatedTable.capacity,
        status: updatedTable.status,
        tableNumber: updatedTable.tableNumber,
        updatedAt: updatedTable.updatedAt,
        createdAt: updatedTable.createdAt,
      },
      updatedTable.id,
    );
  }
  async delete(tableId: string): Promise<void> {
    await client.table.delete({
      where: {
        id: tableId,
      },
    });
  }
}
