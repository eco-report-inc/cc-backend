const express = require('express');
const multer = require('multer');

const upload = multer();
// eslint-disable-next-line import/no-extraneous-dependencies
const { body } = require('express-validator');
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
  multerMiddleware.array('gambar'),
  body('nama_tempat').notEmpty().withMessage('Nama Tempat Wajib Di isi'),
  body('lang').notEmpty().withMessage('Langitude Wajib Di isi'),
  body('long').notEmpty().withMessage('Longitude Wajib Di isi'),
  addReport
);

router.delete('/report/:id', deleteReport);
module.exports = router;
