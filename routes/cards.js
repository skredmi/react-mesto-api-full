const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

router.get('/cards', getCards);
router.post(
  '/cards',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string()
          .required()
          .pattern(/^https?:\/\/(www\.)?[\w-.~:/?#[\]@!$&'()*+,;=]+#?$/i),
      }),
  }),
  createCard,
);
router.delete(
  '/cards/:_id',
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().required().hex(),
      }),
  }),
  deleteCard,
);
router.put(
  '/cards/:_id/likes',
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().required().hex(),
      }),
  }),
  likeCard,
);
router.delete(
  '/cards/:_id/likes',
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().required().hex(),
      }),
  }),
  dislikeCard,
);

module.exports = router;
