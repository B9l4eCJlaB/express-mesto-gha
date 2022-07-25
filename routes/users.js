const express = require('express');
const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controller/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', express.json(), createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
