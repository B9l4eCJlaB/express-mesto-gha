const express = require('express');
const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} = require('../controller/cards');

router.get('/', getCards);
router.post('/', express.json(), createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
