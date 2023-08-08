const Thought = require('../models/Thought');

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

            // const user = await User.findOneAndUpdate(
            //     { _id: req.body.userId },
            //     { $addToSet: { thoughts: thought._id}},
            //     { new: true }
            // );

            if (!user) {
                return res.status(404).json({ message: "Thought added, no user found!" })
            }

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                { new: true , runValidators: true }
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {

        try {
            // const thought = Thought.findOneAndDelete({_id: req.params.thoughtId});
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

            if (!thought) {
                res.json({ message: "Can't delete that thought!" })
            }   
            res.json({ message: "Thought deleted!" });
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async newReaction(req, res) {

        console.log(req.body);
        try {
            const reactionData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: { reactions: req.body }},
                { new: true, runValidators: true}
            );

            if (!reactionData) {
                return res.status(404).json({ message: "No thought found! Bad ID"});
            }

            res.json(reactionData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: { reactions: {reactionId: req.params.reactionId} }}
            );

            res.json({ message: "Reaction deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};