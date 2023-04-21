const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { signin } = require('../controllers/signin');
const { createUser } = require('../controllers/users');
const { signout } = require('../controllers/signout');
const { auth } = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const errNotFound = require('../errors/errNotFound');

router.use(requestLogger);

router.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), signin);
router.post('/api/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.use(auth);

router.delete('/api/signout', signout);
router.use('/api/users', require('./users'));
router.use('/api/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new errNotFound('Неверный запрос.'));
});

router.use(errorLogger);

router.use(errors());

router.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message });
});

module.exports = router;
