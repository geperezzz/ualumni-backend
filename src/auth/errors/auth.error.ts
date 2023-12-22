export abstract class AuthError extends Error {}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid credentials: invalid `email` or `token`', {})
  }
}