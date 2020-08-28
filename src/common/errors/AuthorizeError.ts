export class AuthorizeError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, AuthorizeError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
