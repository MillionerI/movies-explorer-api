const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');
const {
  deletedMovieValidator,
  postMovieValidator,
} = require('../middlewares/request-validator');

router.get('/', getMovies);

router.post('/', postMovieValidator, createMovie);

router.delete('/:movieId', deletedMovieValidator, deleteMovie);

module.exports = router;
