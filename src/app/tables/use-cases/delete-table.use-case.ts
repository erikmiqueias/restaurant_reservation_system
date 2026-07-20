import { ReservationRepository } from "../../reservation/ports/out/repositories/reservation.interface.js";
import {
  TableHasReservationsError,
  TableNotFoundError,
} from "../errors/table.error.js";
import { TableRepository } from "../ports/out/repositories/table.interface.js";

export class DeleteTableUseCase {
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly reservationRepository: ReservationRepository,
  ) {}
  async execute(tableId: string): Promise<void> {
    const [table, hasReservations] = await Promise.all([
      this.tableRepository.getTableById(tableId),
      this.reservationRepository.hasFutureActiveReservations(tableId),
    ]);

    if (!table) throw new TableNotFoundError();
    if (hasReservations) throw new TableHasReservationsError();

    await this.tableRepository.delete(tableId);
  }
}
