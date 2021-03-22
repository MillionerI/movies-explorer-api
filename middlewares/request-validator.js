const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { urlRegEx } = require('../utils/constants');

// User
const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30),
  }),
});

// Movie
const postMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegEx),
    trailer: Joi.string().required().pattern(urlRegEx),
    thumbnail: Joi.string().required().pattern(urlRegEx),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deletedMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

// Exports
module.exports = {
  loginValidator,
  signupValidator,
  updateUserValidator,
  postMovieValidator,
  deletedMovieValidator,
};
