const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { body } = require('express-validator');
const { addReport, deleteReport } = require('../controller/reportController');

const router = express.Router();

router.post(
  '/report',
  body('nama_tempat').notEmpty().withMessage('Nama Tempat Wajib Di isi'),
  body('lang').notEmpty().withMessage('Langitude Wajib Di isi'),
  body('long').notEmpty().withMessage('Longitude Wajib Di isi'),
  addReport
);

router.delete('/report/:id', deleteReport);
module.exports = router;
