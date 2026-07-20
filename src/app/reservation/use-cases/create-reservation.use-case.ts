import { Reservation } from "../../../domain/reservation/entities/reservation.js";
import { TableNotFoundError } from "../../tables/errors/table.error.js";
import { TableRepository } from "../../tables/ports/out/repositories/table.interface.js";
import {
  ReservationAlreadyExistsError,
  ReservationGuestCountExceedsCapacityError,
  ReservationStartTimeConflictError,
} from "../errors/reservation.error.js";
import {
  CreateReservationInDTO,
  CreateReservationOutDTO,
} from "../ports/in/create-reservation.js";
import { ReservationRepository } from "../ports/out/repositories/reservation.interface.js";

export class CreateReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly tableRepository: TableRepository,
  ) {}
  async execute(
    data: CreateReservationInDTO,
  ): Promise<CreateReservationOutDTO> {
    if (data.startTime >= data.endTime)
      throw new ReservationStartTimeConflictError();

    const [table, conflictingReservation] = await Promise.all([
      this.tableRepository.getTableById(data.tableId),
      this.reservationRepository.findConflictingReservations(
        data.tableId,
        data.startTime,
        data.endTime,
      ),
    ]);

    if (!table) throw new TableNotFoundError();
    if (conflictingReservation) throw new ReservationAlreadyExistsError();
    if (data.guestCount > table.capacity)
      throw new ReservationGuestCountExceedsCapacityError();

    const newReservation = Reservation.create({
      tableId: data.tableId,
      userId: data.userId,
      startTime: data.startTime,
      endTime: data.endTime,
      guestCount: data.guestCount,
    });

    await this.reservationRepository.create(newReservation);

    return {
      id: newReservation.id,
      tableId: newReservation.tableId,
      startTime: newReservation.startTime,
      endTime: newReservation.endTime,
      guestCount: newReservation.guestCount,
      status: newReservation.status,
      tableNumber: table.tableNumber,
    };
  }
}
