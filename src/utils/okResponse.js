class OkResponse {
  constructor(res) {
    this.res = res;
  }

  send(statusCode, data) {
    return this.res.status(statusCode).json({
      status: statusCode,
      data: data,
    });
  }
}

module.exports = OkResponse;
