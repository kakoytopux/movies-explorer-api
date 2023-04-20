const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errBadRequest = require('../errors/errBadRequest');

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new errBadRequest('Неправильная почта или пароль.');
      }

      return user;
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((pass) => {
          if (!pass) {
            throw new errBadRequest('Неправильная почта или пароль.');
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? 'dev-secret-key' : JWT_SECRET, { expiresIn: '7d' });

          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          }).end();
        })
        .catch(next);
    })
    .catch(next);
};
