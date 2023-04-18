const Movie = require('../models/movie');

module.exports.getSaveFilmsUser = (req, res) => {
  Movie.find({}).populate('owner')
    .then((film) => res.send({ film }))
    .catch((err) => res.status(500).send({ err }));
};
module.exports.createFilm = (req, res) => {
  const {
    country, director, duration,
    year, description, image, trailer,
    nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((film) => res.send({ film }))
    .catch((err) => res.status(500).send({ err }));
};
module.exports.deleteFilm = (req, res) => {
  Movie.findByIdAndDelete(req.params._id)
    .then((film) => res.send({ film }))
    .catch((err) => res.status(500).send({ err }));
};
