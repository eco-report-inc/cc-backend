const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { body } = require('express-validator');
const { register, login, logout } = require('../controller/userController');

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
router.get('/logout', logout);
module.exports = router;
