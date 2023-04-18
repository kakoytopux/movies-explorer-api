const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ err }));
};
module.exports.updateUserInfo = (req, res) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ err }));
};
module.exports.createUser = (req, res) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 12)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const objUserInfo = user.toObject();
      delete objUserInfo.password;

      res.send({ objUserInfo });
    })
    .catch((err) => res.status(500).send({ err }));
};
