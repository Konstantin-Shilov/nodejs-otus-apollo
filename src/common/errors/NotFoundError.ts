export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
