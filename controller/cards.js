const Card = require('../models/card');

const { NotFoundError, BadRequestError, ForbiddenError } = require('../errors/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return next(new NotFoundError('Не удалось найти карочки'));
      }
      return res.status(200).send({
        data: cards,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;

  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(200).send({
      data: card,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с таким id не найдена'));
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить карточку другого пользователя'));
      }
      return card.remove().then(() => res.send({
        message: 'Карточка удалена',
      }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с таким id не найдена'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с таким id не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};
