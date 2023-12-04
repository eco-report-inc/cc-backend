const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ msg: 'Silahkan Login Terlebih Dahulu' });
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ msg: err });
    req.user = user;
    next();
  });
}
module.exports = authenticateToken;
