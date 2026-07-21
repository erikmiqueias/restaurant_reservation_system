export class ReservationStartTimeConflictError extends Error {
  constructor() {
    super("Start time must be before end time.");
    this.name = "RESERVATION_START_TIME_CONFLICT";
  }
}

export class ReservationGuestCountExceedsCapacityError extends Error {
  constructor() {
    super("Guest count exceeds table capacity.");
    this.name = "RESERVATION_GUEST_COUNT_EXCEEDS_CAPACITY";
  }
}

export class ReservationStartTimeInPastError extends Error {
  constructor() {
    super(
      "Reservation cannot be created if it has already started or is in the past.",
    );
    this.name = "RESERVATION_START_TIME_IN_PAST";
  }
}

export class ReservationAlreadyExistsError extends Error {
  constructor() {
    super("Reservation already exists.");
    this.name = "RESERVATION_ALREADY_EXISTS";
  }
}

export class ReservationInPastError extends Error {
  constructor() {
    super("Reservation cannot be in the past.");
    this.name = "RESERVATION_IN_PAST";
  }
}

export class ReservationTooFarInFutureError extends Error {
  constructor() {
    super("Reservation cannot be more than 30 days in the future.");
    this.name = "RESERVATION_TOO_FAR_IN_FUTURE";
  }
}

export class ReservationOutOfRangeError extends Error {
  constructor() {
    super("Reservations are only allowed between 18:00 and 23:00.");
    this.name = "RESERVATION_OUT_OF_RANGE";
  }
}

export class ReservationTableConflictError extends Error {
  constructor() {
    super("A reservation for this table already exists in this time.");
    this.name = "RESERVATION_TABLE_CONFLICT";
  }
}
