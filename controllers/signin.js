const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errUnauthorized = require('../errors/errUnauthorized');

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new errUnauthorized('Неправильная почта или пароль.');
      }

      return user;
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((pass) => {
          if (!pass) {
            throw new errUnauthorized('Неправильная почта или пароль.');
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? 'dev-secret-token' : JWT_SECRET, { expiresIn: '7d' });

          res.cookie('token', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: 'none',
            secure: false,
          }).end();
        })
        .catch(next);
    })
    .catch(next);
};
