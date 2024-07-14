const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const expressWinston = require("express-winston");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const logger = require("./config/logger");

const responseHandler = require("./middlewares/responseHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");

const userRoute = require("./routes/userRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet()); // 보안관련 HTTP 설정
app.use(cors()); // CORS 설정
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// HTTP 통신 시 로깅
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
  })
);

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

// 정상 응답 핸들러
app.use(responseHandler);

// Route 설정
app.use("/api/users", userRoute);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
