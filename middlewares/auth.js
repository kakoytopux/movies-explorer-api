const jwt = require('jsonwebtoken');
const errUnauthorized = require('../errors/errUnauthorized');

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    next(new errUnauthorized('Необходимо пройти авторизацию.'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'dev-secret-token' : JWT_SECRET);
  } catch (err) {
    next(new errUnauthorized('Необходимо пройти авторизацию.'));
    return;
  }

  req.user = payload;
  next();
};
