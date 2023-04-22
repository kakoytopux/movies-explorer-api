const bcrypt = require('bcryptjs');
const User = require('../models/user');
const errConflict = require('../errors/errConflict');
const errInternal = require('../errors/errInternal');

const createErrInternal = () => new errInternal('Внутренняя ошибка сервера');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch(() => next(createErrInternal()));
};
module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new errConflict('Такая почта уже используется.'));
        return;
      }

      next(createErrInternal());
    });
};
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 12)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const objUserInfo = user.toObject();
      delete objUserInfo.password;

      res.status(201).send({ objUserInfo });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new errConflict('Такая почта уже используется.'));
        return;
      }

      next(createErrInternal());
    });
};
