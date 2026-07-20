import { randomUUID } from "node:crypto";
import {
  ReservationInPastError,
  ReservationOutOfRangeError,
  ReservationStartTimeConflictError,
  ReservationStartTimeInPastError,
  ReservationTooFarInFutureError,
} from "../../../app/reservation/errors/reservation.error.js";

export type ReservationStatus = "ACTIVE" | "CANCELED" | "COMPLETED";

export interface ReservationProps {
  tableId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
  guestCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateReservationProps = Omit<ReservationProps, "status">;

export class Reservation {
  private _id: string;
  private props: ReservationProps;

  constructor(props: ReservationProps, id: string) {
    this._id = id;
    this.props = props;
  }

  static create(props: CreateReservationProps, id?: string): Reservation {
    const now = new Date();

    if (props.startTime < now) {
      throw new ReservationInPastError();
    }
    const maxAdvanceDate = new Date();
    maxAdvanceDate.setDate(now.getDate() + 30);

    if (props.startTime > maxAdvanceDate) {
      throw new ReservationTooFarInFutureError();
    }
    const startHour = props.startTime.getHours();

    if (startHour < 18 || startHour >= 23) {
      throw new ReservationOutOfRangeError();
    }
    const closingTime = new Date(props.startTime);
    closingTime.setHours(23, 0, 0, 0);

    if (props.endTime > closingTime) throw new ReservationOutOfRangeError();

    if (props.startTime >= props.endTime)
      throw new ReservationStartTimeConflictError();

    if (props.startTime < new Date())
      throw new ReservationStartTimeInPastError();

    return new Reservation(
      {
        ...props,
        status: "ACTIVE",
        createdAt: new Date(),
      },
      id ?? randomUUID(),
    );
  }

  static restore(props: ReservationProps, id: string): Reservation {
    return new Reservation(props, id);
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  public cancel(): void {
    if (this.props.status === "CANCELED") {
      throw new Error("");
    }

    if (this.props.startTime < new Date()) {
      throw new Error(
        "Reservation cannot be canceled if it has already started or is in the past.",
      );
    }

    this.props.status = "CANCELED";
    this.touch();
  }

  get id(): string {
    return this._id;
  }

  get tableId(): string {
    return this.props.tableId;
  }

  get userId(): string {
    return this.props.userId;
  }

  get startTime(): Date {
    return this.props.startTime;
  }

  get endTime(): Date {
    return this.props.endTime;
  }

  get status(): ReservationStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get guestCount(): number {
    return this.props.guestCount;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }
}
