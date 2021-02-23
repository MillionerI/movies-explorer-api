const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AuthorizationError } = require('../errors/index');
const { JWT_SECRET } = require('../config');

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AuthorizationError('Неверный логин или пароль');

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .status(200)
        .send({ message: 'Авторизация успешна!', email: user.email, token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (!email || !password) throw new AuthorizationError('Проверьте правильность логина или пароля');
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(({ _id }) => User.findById(_id).select())
    .then((user) => res.status(200).send({ data: user._id }))
    .catch(next);
};

module.exports = { createUser, login };
