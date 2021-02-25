const router = require('express').Router();
const auth = require('../middlewares/auth');
const { loginValidator, signupValidator } = require('../middlewares/request-validator');
const { login, createUser } = require('../controllers/auth');
const movieRouter = require('./movie');
const usersRouter = require('./users');
const notFoundRouter = require('./404');

router.post('/signup', signupValidator, createUser);

router.post('/signin', loginValidator, login);

router.use('/movies', auth, movieRouter);

router.use('/users', auth, usersRouter);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('*', notFoundRouter);

module.exports = router;
