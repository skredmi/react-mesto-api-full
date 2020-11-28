const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser,
);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
      }),
  }),
  updateUser,
);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string()
          .required()
          .pattern(/^https?:\/\/(www\.)?[\w-.~:/?#[\]@!$&'()*+,;=]+#?$/i),
      }),
  }),
  updateAvatar,
);

module.exports = router;
