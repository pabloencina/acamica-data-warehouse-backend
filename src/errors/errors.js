export class InvalidIdError extends Error {
  constructor(message) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
  }
}

export class AlreadyInDbError extends Error {
  constructor(message) {
    super(message);
  }
}

export class ValidationFailedError extends Error {
  constructor(message, errors) {
    super(message);
    this.errors = errors;
  }
}

export class RequiredFieldsError extends Error {
  constructor(message) {
    super(message);
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message) {
    super(message);
  }
}

export class IntegrityError extends Error {
  constructor(message, errors) {
    super(message);
    this.errors = errors;
  }
}
