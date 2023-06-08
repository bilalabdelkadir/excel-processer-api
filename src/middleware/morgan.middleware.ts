import morgan from "morgan";
import logger from "../utils/logger.js";

const stream = {
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const MorganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

export default MorganMiddleware;