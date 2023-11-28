// eslint-disable-next-line import/no-extraneous-dependencies
const { Storage } = require('@google-cloud/storage');

const uploadFiles = async (files) => {
  const gcs = new Storage({
    projectId: 'hale-boulevard-402803',
    keyFilename: './helper/service.json',
  });
  const bucket = gcs.bucket(process.env.BUCKET_NAME);
  const promises = [];
  const newFileNames = [];
  const dateNow = new Date().toISOString();
  files.forEach((file) => {
    const originalNameWithoutExtension = file.originalname
      .split('.')
      .slice(0, -1)
      .join('.');
    const extension = file.originalname.split('.').pop();
    const newFileName = `${originalNameWithoutExtension}-${dateNow}.${extension}`;
    newFileNames.push(newFileName);
    const blob = bucket.file(newFileName);
    const blobStream = blob.createWriteStream();

    const promise = new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', () => {
        resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      });
      blobStream.end(file.buffer);
    });

    promises.push(promise);
  });

  try {
    await Promise.all(promises);
    return newFileNames;
  } catch (err) {
    console.log(err);
    return 'File Gagal Di Upload';
  }
};

module.exports = uploadFiles;
