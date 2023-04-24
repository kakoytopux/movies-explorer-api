const { Joi } = require('celebrate');
const { regularExpressionForLinks } = require('../utils/const');

const validateCreateFilm = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regularExpressionForLinks),
    trailerLink: Joi.string().required().regex(regularExpressionForLinks),
    thumbnail: Joi.string().required().regex(regularExpressionForLinks),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};
const validateDeleteFilm = {
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
};
const validateUpdateUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};
const validateSignIn = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
const validateSignUp = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};

module.exports = {
  validateCreateFilm,
  validateDeleteFilm,
  validateUpdateUser,
  validateSignIn,
  validateSignUp,
};
