export class UnprocessableEntityError extends Error {
  constructor() {
    super(`Unprocessable entity`);
    this.name = `UnprocessableEntityError`;
  }
}
