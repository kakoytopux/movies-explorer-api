const errUnauthorized = require('../errors/errUnauthorized');

module.exports.checkcookie = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    next(new errUnauthorized('Необходимо пройти авторизацию.'));
    return;
  }
};
