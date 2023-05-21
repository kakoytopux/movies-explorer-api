const router = require('express').Router();
const cors = require('cors');
const { celebrate, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { signin } = require('../controllers/signin');
const { createUser } = require('../controllers/users');
const { signout } = require('../controllers/signout');
const { auth } = require('../middlewares/auth');
const errNotFound = require('../errors/errNotFound');
const limiter = require('../middlewares/limiter');
const { validateSignIn, validateSignUp } = require('../middlewares/validation');
const { checkcookie } = require('../controllers/checkcookie');

const corsOpt = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

router.use(cors(corsOpt));

router.use(requestLogger);

router.use(limiter);

router.post('/signin', celebrate(validateSignIn), signin);
router.post('/signup', celebrate(validateSignUp), createUser);
router.get('/check-cookie', checkcookie);

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
