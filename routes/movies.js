const router = require('express').Router();
const { getSaveFilmsUser, createFilm, deleteFilm } = require('../controllers/movies');

router.get('/', getSaveFilmsUser);
router.post('/', createFilm);
router.delete('/:_id', deleteFilm);

module.exports = router;
