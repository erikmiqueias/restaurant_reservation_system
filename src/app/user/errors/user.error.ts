export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User already exists.");
    this.name = "CONFLICT_USER";
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super("User not found.");
    this.name = "NOT_FOUND_USER";
  }
}

export class GenericAuthError extends Error {
  constructor() {
    super("Invalid email or password.");
    this.name = "INVALID_AUTH";
  }
}
