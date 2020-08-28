export class AuthError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
