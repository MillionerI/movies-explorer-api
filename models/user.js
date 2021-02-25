const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const { AuthorizationError } = require('../errors/index');
const { requiredValidationMessage } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, requiredValidationMessage('email')],
    unique: true,
    validate: {
      validator(v) {
        return validate.isEmail(v);
      },
      message: ({ value }) => `${value} - некорректный email`,
    },
  },
  password: {
    type: String,
    required: [true, requiredValidationMessage('password')],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимальная длина имени - 30 символов'],
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
