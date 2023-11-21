const { PrismaClient } = require('@prisma/client');
const generateAccessToken = require('../../helper/generateToken');

const prisma = new PrismaClient();
const register = async (req, res) => {
  const { nama, email, password } = req.body;
  if (!nama || !email || !password) {
    return res.status(400).json({ error: 'wajib diisi' });
  }
  try {
    const user = await prisma.user.create({
      data: {
        nama,
        email,
        password,
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

const logout = async (req, res) => {
  res.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    return res.json({ message: 'Logout successful' });
  });
};
module.exports = { register, login, logout };
