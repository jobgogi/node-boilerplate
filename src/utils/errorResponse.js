class ErrorResponse {
  constructor(status, error, path, details = {}) {
    this.status = status;
    this.error = error;
    this.path = path;
    this.timestamp = new Date().toISOString();
    this.details = details;
  }
}

module.exports = ErrorResponse;
