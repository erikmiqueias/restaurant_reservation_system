import { ReservationRepository } from "../../reservation/ports/out/repositories/reservation.interface.js";
import {
  TableHasReservationsError,
  TableNotFoundError,
  TableNumberAlreadyExistsError,
} from "../errors/table.error.js";
import {
  UpdateTableInDTO,
  UpdateTableOutDTO,
} from "../ports/in/update-table.js";
import { TableRepository } from "../ports/out/repositories/table.interface.js";

export class UpdateTableUseCase {
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly reservationRepository: ReservationRepository,
  ) {}
  async execute(
    data: Partial<UpdateTableInDTO>,
    tableId: string,
  ): Promise<UpdateTableOutDTO> {
    const [table, hasReservations] = await Promise.all([
      this.tableRepository.getTableById(tableId),
      this.reservationRepository.hasFutureActiveReservations(tableId),
    ]);

    if (!table) throw new TableNotFoundError();
    const hasChangesRequested =
      data.capacity !== undefined ||
      data.status !== undefined ||
      data.tableNumber !== undefined;

    if (hasChangesRequested) {
      if (hasReservations) throw new TableHasReservationsError();
    }

    if (data.capacity !== undefined) table.changeCapacity(data.capacity);

    if (data.status !== undefined) table.changeStatus(data.status);

    const isUpdatingToDifferentTable =
      data.tableNumber !== undefined && data.tableNumber !== table.tableNumber;

    if (isUpdatingToDifferentTable) {
      const numberInUse = await this.tableRepository.getTableByNumber(
        data.tableNumber!,
      );
      if (numberInUse) throw new TableNumberAlreadyExistsError();
      table.changeTableNumber(data.tableNumber!);
    }

    const hasChanges = table.updatedAt !== undefined;

    if (hasChanges) await this.tableRepository.update(table);

    return {
      id: table.id,
      tableNumber: table.tableNumber,
      capacity: table.capacity,
      status: table.status,
      updatedAt: table.updatedAt,
    };
  }
}
