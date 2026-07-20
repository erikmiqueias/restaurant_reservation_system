import { CancelReservationInDTO } from "../ports/in/cancel-reservation.js";
import { ReservationRepository } from "../ports/out/repositories/reservation.interface.js";

export class CancelReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}
  async execute(data: CancelReservationInDTO): Promise<void> {
    const reservation = await this.reservationRepository.findReservationById(
      data.reservationId,
    );

    if (!reservation) throw new Error("Reservation not found.");

    if (reservation.userId !== data.userId)
      throw new Error("You are not authorized to cancel this reservation.");

    reservation.cancel();
    await this.reservationRepository.update(reservation);
  }
}
