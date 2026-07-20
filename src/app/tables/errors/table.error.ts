export class TableAlreadyExistsError extends Error {
  constructor() {
    super("Table already exists.");
    this.name = "CONFLICT_TABLE";
  }
}

export class TableCapacityNotAvailableError extends Error {
  constructor() {
    super("Table capacity is must be between 1 and 8.");
    this.name = "CAPACITY_NOT_AVAILABLE";
  }
}

export class TableNotFoundError extends Error {
  constructor() {
    super("Table not found.");
    this.name = "TABLE_NOT_FOUND";
  }
}

export class TableNumberNotAvailableError extends Error {
  constructor() {
    super("Table number is must be greater than 0.");
    this.name = "TABLE_NUMBER_NOT_AVAILABLE";
  }
}

export class TableNumberAlreadyExistsError extends Error {
  constructor() {
    super("Table number is already in use.");
    this.name = "TABLE_NUMBER_ALREADY_EXISTS";
  }
}

export class TableHasReservationsError extends Error {
  constructor() {
    super(
      "Table has reservations and cannot be deleted or updated while active reservations exist.",
    );
    this.name = "TABLE_HAS_RESERVATIONS";
  }
}
