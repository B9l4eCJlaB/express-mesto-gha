require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
  if (!token) {
    return next(new UnauthorizedError('Ошибка авторизации'));
  }
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    throw new UnauthorizedError('Для доступа необходима авторизация');
  }
  req.user = payload;
  return next();
};
