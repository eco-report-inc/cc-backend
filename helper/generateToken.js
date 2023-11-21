/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
const jwt = require('jsonwebtoken');
// eslint-disable-next-line arrow-body-style
const generateAccessToken = (user_id, email) => {
  return jwt.sign({ user_id, email }, process.env.TOKEN_SECRET, {
    expiresIn: '43200s',
  });
};
module.exports = generateAccessToken;
