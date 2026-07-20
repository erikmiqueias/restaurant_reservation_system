import { ReservationStatus } from "../../../../domain/reservation/entities/reservation.js";

export type GetAllReservationsByUserIdOutDTO = {
  id: string;
  tableId: string;
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
  guestCount: number;
  tableNumber: number;
};
