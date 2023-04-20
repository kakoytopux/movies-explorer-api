const Movie = require('../models/movie');
const errInternal = require('../errors/errInternal');

const createErrInternal = () => new errInternal('Внутренняя ошибка сервера');

module.exports.getSaveFilmsUser = (req, res, next) => {
  Movie.find({ owner: req.user._id }).populate('owner')
    .then((film) => res.send({ film }))
    .catch(() => next(createErrInternal()));
};
module.exports.createFilm = (req, res, next) => {
  const {
    country, director, duration,
    year, description, image, trailerLink,
    nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    movieId,
  })
    .then((film) => res.send({ film }))
    .catch(() => next(createErrInternal()));
};
module.exports.deleteFilm = (req, res, next) => {
  Movie.findByIdAndDelete(req.params._id).populate('owner')
    .then((film) => res.send({ film }))
    .catch(() => next(createErrInternal()));
};
