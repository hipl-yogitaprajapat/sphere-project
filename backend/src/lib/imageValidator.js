// utils/fileValidator.js
import fs from "fs";
import path from "path";

export const validateImage = (file, maxSizeMB = 1) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.includes(ext)) {
    fs.unlinkSync(file.path);
    throw new Error("Only JPG, JPEG, and PNG images are allowed");
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    fs.unlinkSync(file.path);
    throw new Error(`Image must not be larger than ${maxSizeMB}MB`);
  }

  return file.filename;
};
