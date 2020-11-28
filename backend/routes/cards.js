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
  '/cards/:id',
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().hex(),
      }),
  }),
  deleteCard,
);
router.put(
  '/cards/:id/likes',
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().hex(),
      }),
  }),
  likeCard,
);
router.delete(
  '/cards/:id/likes',
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().hex(),
      }),
  }),
  dislikeCard,
);

module.exports = router;
