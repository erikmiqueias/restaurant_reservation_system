import { Table } from "../../../domain/table/entities/table.js";
import { TableAlreadyExistsError } from "../errors/table.error.js";
import {
  CreateTableInDTO,
  CreateTableOutDTO,
} from "../ports/in/create-table.js";
import { TableRepository } from "../ports/out/repositories/table.interface.js";

export class CreateTableUseCase {
  constructor(private readonly tableRepository: TableRepository) {}
  async execute(table: CreateTableInDTO): Promise<CreateTableOutDTO> {
    const tableExists = await this.tableRepository.getTableByNumber(
      table.tableNumber,
    );

    if (tableExists) throw new TableAlreadyExistsError();

    const newTable = Table.create({
      tableNumber: table.tableNumber,
      capacity: table.capacity,
      status: table.status,
    });

    await this.tableRepository.create(newTable);

    return newTable;
  }
}
