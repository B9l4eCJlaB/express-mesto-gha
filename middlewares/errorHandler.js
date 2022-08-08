const statusCodes = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = statusCodes.DEFAULT, message } = err;
  res.status(statusCode).send({
    message: statusCode === statusCodes.DEFAULT ? 'На сервере произошла ошибка' : message,
  });
  next();
});
