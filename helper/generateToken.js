// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

// eslint-disable-next-line arrow-body-style
const generateAccessToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
    expiresIn: '43200s',
  });
};
module.exports = generateAccessToken;
