import { GetAllTablesOutDTO } from "../ports/in/get-all-tables.js";
import { TableRepository } from "../ports/out/repositories/table.interface.js";

export class GetAllTablesUseCase {
  constructor(private readonly tableRepository: TableRepository) {}
  async execute(): Promise<GetAllTablesOutDTO[]> {
    const tables = await this.tableRepository.getAllTables();

    const tableMap = tables.map((table) => ({
      id: table.id,
      tableNumber: table.tableNumber,
      capacity: table.capacity,
      status: table.status,
      createdAt: table.createdAt,
    }));

    return tableMap;
  }
}
