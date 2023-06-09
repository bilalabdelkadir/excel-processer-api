import { upload } from "../middleware/multerUploader.middleware.js";
import express, { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import { processExcelData } from "../utils/excel.utils.js";
const router = express.Router();

router.post(
  '/upload',
  upload.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new Error('No file uploaded');
      }

      const filePath = req.file.path;
      const products = await processExcelData(filePath);

      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

export { router as uploadFileRouter };
