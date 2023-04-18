const User = require('../models/user');

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ err }));
};
module.exports.updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { new: true })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ err }));
};
