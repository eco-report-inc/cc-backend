const multer = require('multer');

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});
module.exports = multerMiddleware;
