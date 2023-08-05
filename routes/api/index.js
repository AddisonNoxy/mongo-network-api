const router = require('express').Router();

const userRoutes = require('./User');
const thoughtRoutes = require('./Thought');
const reactRoutes = require('./Reaction');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactRoutes);

module.exports = router;