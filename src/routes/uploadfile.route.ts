import { upload } from "../middleware/multerUploader.middleware.js";
import express, { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
const router = express.Router();

router.post("/upload", upload.single("file"), (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    logger.info("File uploaded successfully");
    logger.info(req.file);
    logger.info(req.body);
    res.send("File uploaded successfully");
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
});

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

export { router as uploadFileRouter };
