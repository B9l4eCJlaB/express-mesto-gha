const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { linkRegEx } = require('../utils/RegEx');

const {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} = require('../controller/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(linkRegEx),
    }).messages({ 'string.pattern': 'Некорректный URL' }),
  }),
  createCard,
);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), putLikeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteLikeCard);

module.exports = router;
