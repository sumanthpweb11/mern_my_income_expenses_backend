class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = this.statusCode;
  }
}

export default ErrorHandler;
