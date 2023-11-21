/* eslint-disable camelcase */
const { PrismaClient } = require('@prisma/client');

// eslint-disable-next-line import/no-extraneous-dependencies
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const addReport = async (req, res) => {
  const { nama_tempat, lang, long } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await prisma.report.create({
      data: {
        nama_tempat,
        lang,
        long,
        userId: {
          connect: {
            user_id: req.user.user_id,
          },
        },
      },
    });
    return res.status(201).json({
      message: 'Sukses Melakukan Report',
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

module.exports = { addReport };
