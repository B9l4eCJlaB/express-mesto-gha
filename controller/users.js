const User = require('../models/user');
const statusCodes = require('../utils/constants');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send({ message: 'Некорректный id пользователя' });
    }
    return res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(statusCodes.BAD_REQUEST).send({
        message: 'Переданы некорректные имя, описание или аватар',
      });
    }
    return res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(statusCodes.BAD_REQUEST).send({
        message: 'Переданы некорректные имя или описание',
      });
    }
    return res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(statusCodes.BAD_REQUEST).send({
        message: 'Переданы некорректные данные при обновлении аватара',
      });
    }
    return res
      .status(statusCodes.DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};
