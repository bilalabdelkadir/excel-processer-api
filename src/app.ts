import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import morganMiddleware from "./middleware/morgan.middleware.js";
import { uploadFileRouter } from "./routes/uploadfile.route.js";
import { productRouter } from "./routes/product.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(morganMiddleware);

app.get("/", (req: Request, res: Response) => {
  logger.info("Checking the API status: Everything is OK");
  res.status(200).send({
    status: "UP",
    message: "The API is up and running!",
  });
});

app.use("/api", uploadFileRouter);
app.use("/api/product", productRouter);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
