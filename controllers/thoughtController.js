const Thought = require('/..models/Thought');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtList = await Thought.find();
            res.json(thoughtList);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            .select('-__v')
            .populate('reactions');

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                req.body
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = Thought.deleteOne({_id: req.params.thoughtId});
            res.json({ message: "Thought deleted!" });
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async newReaction(req, res) {
        try {
            const reactionData = Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: { reactions: req.body }},
                { new: true, runValidators: true}
            );

            res.json(reactionData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const reactionData = Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: { reactions: reactionId }}
            );

            res.json({ message: "Reaction deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};