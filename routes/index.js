const router = require('express').Router();
const userRoutes = require('./users.js');
const cardRoutes = require('./cards.js');
const errorRoutes = require('./error.js');

router.use('/', userRoutes);
router.use('/', cardRoutes);
router.use('/', errorRoutes);

module.exports = router;
