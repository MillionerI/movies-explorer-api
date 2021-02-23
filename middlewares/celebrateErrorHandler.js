const { isCelebrateError } = require('celebrate');

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res.status(400).send({
      message: 'Проверьте отправляемые данные',
    });
    return;
  }
  next(err);
};

module.exports = celebrateErrorHandler;
