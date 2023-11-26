const multer = require('multer');

const extension = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  // eslint-disable-next-line consistent-return
  fileFilter: (req, file, cb) => {
    if (!extension.includes(file.mimetype)) {
      return cb(new Error('Format File Tidak Di Dukung'));
    }
    cb(null, true);
  },
});
module.exports = multerMiddleware;
