const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

//route /api/thoughts
router.route('/').get(getThoughts).post(createThought);

//route /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

//route /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(newReaction);

//route /api/thoughts/:thoughtId/:reactionId
router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;