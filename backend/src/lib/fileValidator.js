import fs from "fs";
import path from "path";

export const validateFile = (file, allowedTypes = [], maxSizeMB = 5) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.includes(ext)) {
    fs.unlinkSync(file.path);
    throw new Error(`Only ${allowedTypes.join(", ")} files are allowed`);
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    fs.unlinkSync(file.path);
    throw new Error(`File must not be larger than ${maxSizeMB}MB`);
  }

  return file.filename;
};

