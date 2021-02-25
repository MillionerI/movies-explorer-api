const AuthorizationError = require('./auth-err');
const ForbiddenError = require('./forbidden-err');
const NotFoundError = require('./not-found-err');
const ValidationError = require('./validation-err');

module.exports = {
  AuthorizationError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
};
