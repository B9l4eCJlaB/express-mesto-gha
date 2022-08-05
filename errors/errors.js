const UnauthorizedError = require('./UnauthorizedError');
const NotFoundError = require('./NotFoundError');
const BadRequestError = require('./BadRequestError');
const UserExistsError = require('./UserExistsError');
const ForbiddenError = require('./ForbiddenError');
const DefaultError = require('./DefaultError');

module.exports = {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  UserExistsError,
  ForbiddenError,
  DefaultError,
};
