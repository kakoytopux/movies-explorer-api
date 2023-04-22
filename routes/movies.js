const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getSaveFilmsUser, createFilm, deleteFilm } = require('../controllers/movies');
const { validateCreateFilm, validateDeleteFilm } = require('../middlewares/validation');

router.get('/', getSaveFilmsUser);
router.post('/', celebrate(validateCreateFilm), createFilm);
router.delete('/:_id', celebrate(validateDeleteFilm), deleteFilm);

module.exports = router;
