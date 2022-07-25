const Card = require('../models/card');
const statusCodes = require('../utils/constants');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.send(cards);
  } catch (err) {
    return res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(statusCodes.BAD_REQUEST).send({
        message: 'Переданы некорректные данные при создании карточки',
      });
    }
    return res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(statusCodes.BAD_REQUEST).send({
        message: 'Некорректный id карточки',
      });
    }
    return res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};
module.exports.putLikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!card) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(statusCodes.BAD_REQUEST).send({
        message: 'Переданы некорректные данные для постановки лайка',
      });
    }
    return res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.deleteLikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!card) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(statusCodes.BAD_REQUEST).send({
        message: ' Переданы некорректные данные для снятии лайка',
      });
    }
    return res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};
