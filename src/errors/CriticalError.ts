export class CriticalError extends Error {
  constructor() {
    super("Critical error happenned during run-time");
  }
}
