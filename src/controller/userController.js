/* eslint-disable object-curly-newline */
const { PrismaClient } = require('@prisma/client');
// eslint-disable-next-line import/no-extraneous-dependencies
const { validationResult } = require('express-validator');
const generateAccessToken = require('../../helper/generateToken');
const uploadFiles = require('../../helper/uploadFile');

const prisma = new PrismaClient();
const register = async (req, res) => {
  const { nama, email, password, address } = req.body;
  const foto = 'default-profile.png';
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await prisma.user.create({
      data: {
        nama,
        email,
        password,
        address,
        foto,
      },
    });
    return res.status(201).json({
      message: 'Sukses Melakukan Registrasi',
      token: generateAccessToken(user.user_id, user.email),
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
    if (user == null) {
      return res.status(404).json({ message: 'User Tidak Ditemukan' });
    }
    return res.status(200).json({
      message: 'Berhasil Melakukan Autentikasi',
      token: generateAccessToken(user.user_id, user.email),
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
const uploadPhoto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let foto = await uploadFiles(req.files);
    // eslint-disable-next-line prefer-destructuring
    foto = foto[0];
    await prisma.user.update({
      where: {
        user_id: req.user.user_id,
      },
      data: {
        foto,
      },
    });
    return res.status(200).json({
      message: 'Berhasil Melakukan Upload Foto',
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const logout = async (req, res) => {
  res.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    return res.json({ message: 'Logout successful' });
  });
};
module.exports = { register, login, logout, uploadPhoto };
