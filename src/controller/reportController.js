/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */

const { PrismaClient } = require('@prisma/client');

// eslint-disable-next-line import/no-extraneous-dependencies
const { validationResult } = require('express-validator');
const uploadFiles = require('../../helper/uploadFile');

const prisma = new PrismaClient();

const getAllReport = async (req, res) => {
  const { long, lang } = req.query;
  let report = '';
  try {
    if (
      typeof long !== 'undefined' &&
      long !== '' &&
      typeof lang !== 'undefined' &&
      lang !== ''
    ) {
      report = await prisma.report.findMany({
        where: {
          AND: {
            long: {
              equals: long,
            },
            lang: {
              equals: lang,
            },
          },
        },
        include: {
          Image: true,
        },
      });
    } else {
      report = await prisma.report.findMany({
        include: {
          Image: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    if (report.length === 0) {
      return res.status(200).json({ message: 'Data Kosong' });
    }
    return res.status(200).json({ message: 'Sukses', data: report });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getOneReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await prisma.report.findUnique({
      where: {
        report_id: id,
      },
      include: {
        Image: true,
      },
    });
    if (!report) {
      return res.status(404).json({ message: 'report tidak ditemukan' });
    }
    return res.status(200).json({
      data: report,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error.message,
    });
  }
};

const addReport = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { nama_tempat, lang, long, } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const fileNames = await uploadFiles(req.file);
    const fileNamesStore = {
      gambar: `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${fileNames}`,
    };
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
        Image: {
          createMany: {
            data: fileNamesStore,
          },
        },
        // description,
      },
    });
    return res.status(201).json({
      message: 'Sukses Melakukan Report',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

const updateReport = async (req, res) => {
  const { id } = req.params;
  const { nama_tempat, lang, long } = req.body;
  console.log(`${id}, ${nama_tempat}, ${lang}, ${long}`);
  try {
    const updatedReport = await prisma.report.update({
      where: { report_id: id },
      data: {
        nama_tempat,
        lang,
        long,
      },
    });
    return res.status(200).json({
      data: updatedReport,
      message: 'Update successfully',
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message });
  }
};

const deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.report.delete({
      where: {
        report_id: id,
      },
    });
    return res.status(200).json({
      message: 'delete success',
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = {
  addReport,
  deleteReport,
  getAllReport,
  getOneReport,
  updateReport,
};
