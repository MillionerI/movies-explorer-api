const Movie = require('../models/movie');
const { NotFoundError, ForbiddenError } = require('../errors/index');

const getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new NotFoundError('Фильмы не найдены'))
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .select('+owner')
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) return Promise.reject(new ForbiddenError('Нельзя удалить чужой фильм'));
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => res.status(200).send({ message: `Фильм '${movie.nameRU}' удален` }))
    .catch(next);
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
