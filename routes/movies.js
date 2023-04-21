const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getSaveFilmsUser, createFilm, deleteFilm } = require('../controllers/movies');
const { regularExpressionForLinks } = require('../utils/const');

router.get('/', getSaveFilmsUser);
router.post('/', celebrate({
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
}), createFilm);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
}), deleteFilm);

module.exports = router;
