import multer from "multer";
import path from 'node:path'

const pathToResume = path.resolve('public','data');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathToResume);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const type = file.mimetype.split('/')[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + '.' + type);
  },
});

export const upload = multer({ storage: storage });

