import { UserNotFoundError } from "../../user/errors/user.error.js";
import { UserRepository } from "../../user/ports/out/repositories/user.interface.js";
import { GetAllReservationsByUserIdOutDTO } from "../ports/in/get-all-reservations-by-user-id.js";
import { ReservationRepository } from "../ports/out/repositories/reservation.interface.js";

export class GetAllReservationsByUserIdUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(userId: string): Promise<GetAllReservationsByUserIdOutDTO[]> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) throw new UserNotFoundError();

    const results =
      await this.reservationRepository.getAllReservationsByUserId(userId);

    return results.map((result) => ({
      id: result.reservation.id,
      tableId: result.reservation.tableId,
      startTime: result.reservation.startTime,
      endTime: result.reservation.endTime,
      status: result.reservation.status,
      guestCount: result.reservation.guestCount,
      tableNumber: result.tableNumber,
    }));
  }
}
