import { ReservationStatus } from "../../../../domain/reservation/entities/reservation.js";

export type CreateReservationInDTO = {
  tableId: string;
  userId: string;
  startTime: Date;
  guestCount: number;
  endTime: Date;
};

export type CreateReservationOutDTO = {
  id: string;
  tableId: string;
  startTime: Date;
  endTime: Date;
  guestCount: number;
  tableNumber: number;
  status: ReservationStatus;
};
