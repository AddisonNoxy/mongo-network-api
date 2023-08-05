const router = require('express').Router();

const userRoutes = require('./User');
const thoughtRoutes = require('./Thought');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;