// eslint-disable-next-line import/no-extraneous-dependencies
const { Storage } = require('@google-cloud/storage');

const uploadFiles = async (file) => {
  const gcs = new Storage({
    projectId: 'hale-boulevard-402803',
    keyFilename: './helper/service.json',
  });
  const bucket = gcs.bucket(process.env.BUCKET_NAME);
  const dateNow = new Date().toISOString();
  const originalNameWithoutExtension = file.originalname
    .split('.')
    .slice(0, -1)
    .join('.');
  const extension = file.originalname.split('.').pop();
  const newFileName = `${originalNameWithoutExtension}-${dateNow}.${extension}`;
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

  try {
    await promise;
    return newFileName;
  } catch (err) {
    console.log(err);
    return 'File Gagal Di Upload';
  }
};

module.exports = uploadFiles;
