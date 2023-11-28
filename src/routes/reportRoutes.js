const express = require('express');
const multer = require('multer');

const upload = multer();
// eslint-disable-next-line import/no-extraneous-dependencies
const { body, check } = require('express-validator');
const {
  addReport,
  deleteReport,
  getAllReport,
  getOneReport,
  updateReport,
} = require('../controller/reportController');
const multerMiddleware = require('../../helper/multerConfig');

const router = express.Router();

router.get('/report', getAllReport);
router.get('/report/:id', getOneReport);
router.patch('/updatereport/:id', upload.none(), updateReport);
router.post(
  '/report',
  (req, res, next) => {
    multerMiddleware(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return next();
    });
  },
  body('nama_tempat').notEmpty().withMessage('Nama Tempat Wajib Di isi'),
  body('lang').notEmpty().withMessage('Langitude Wajib Di isi'),
  body('long').notEmpty().withMessage('Longitude Wajib Di isi'),
  check('gambar').custom((value, { req }) => {
    if (!req.files || req.files.length === 0) {
      throw new Error('Gambar Wajib Di isi');
    }
    return true;
  }),
  addReport
);

router.delete('/report/:id', deleteReport);
module.exports = router;
