const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { signin } = require('../controllers/signin');
const { createUser } = require('../controllers/users');
const { signout } = require('../controllers/signout');
const { auth } = require('../middlewares/auth');
const errNotFound = require('../errors/errNotFound');

router.use(requestLogger);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), signin);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.use(auth);

router.delete('/signout', signout);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new errNotFound('Неверный запрос.'));
});

router.use(errorLogger);

router.use(errors());

router.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message });
});

module.exports = router;
