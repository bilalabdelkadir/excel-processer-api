import multer, { Multer } from "multer";
import { Request } from "express";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".xlsx");
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const fileExt = path.extname(file.originalname);
  if (fileExt === ".xlsx") {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files are allowed"));
  }
};

const upload: Multer = multer({ storage, fileFilter });

export { upload };
