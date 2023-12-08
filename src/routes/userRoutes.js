const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { body, check } = require('express-validator');
const {
  register,
  login,
  logout,
  uploadPhoto,
} = require('../controller/userController');
const multerMiddleware = require('../../helper/multerConfig');
const authenticateToken = require('../../helper/middleware');

const router = express.Router();
router.post(
  '/register',
  body('nama')
    .isLength({ min: 3 })
    .withMessage('Nama Minimal 5 karakter')
    .notEmpty()
    .withMessage('Nama Wajib Di Isi'),
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('Email Harus Di isi, Atau Email Harus Valid'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password Minimal 5 karakter')
    .notEmpty()
    .withMessage('Password Wajib Di Isi'),
  register
);
router.post(
  '/login',
  body('email')
    .isEmail()
    .withMessage('Email Harus Valid')
    .notEmpty()
    .withMessage('Email Harus Di isi'),

  body('password')
    .isLength({ min: 5 })
    .withMessage('Password Minimal 5 karakter')
    .notEmpty()
    .withMessage('Password Wajib Di Isi'),
  login
);
router.patch(
  '/upload-photo',
  authenticateToken,
  (req, res, next) => {
    multerMiddleware(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return next();
    });
  },
  check('gambar').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Gambar Wajib Di isi');
    }
    return true;
  }),
  uploadPhoto
);
router.get('/logout', logout);
module.exports = router;
