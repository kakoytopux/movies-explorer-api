const Movie = require('../models/movie');
const errInternal = require('../errors/errInternal');
const errForbidden = require('../errors/errForbidden');
const errNotFound = require('../errors/errNotFound');
const errBadRequest = require('../errors/errBadRequest');

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
  Movie.findById(req.params._id).populate('owner')
    .then((movie) => {
      if (movie === null) {
        next(new errNotFound('Фильм не найден.'));
        return;
      }
      if (movie.owner._id != req.user._id) {
        next(new errForbidden('Отказано в доступе.'));
        return;
      }

      return movie.deleteOne({}).then((item) => res.send({ item }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new errBadRequest('Указан недопустимый _id.'));
        return;
      }

      next(createErrInternal());
    });
};
