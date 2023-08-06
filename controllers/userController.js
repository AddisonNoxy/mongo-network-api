const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const userList = await User.find();
            res.json(userList);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
            .select('-__v')
            .populate('thoughts')
            .populate('friends');

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { runValidators: true }
            );

            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.deleteOne({_id: req.params.userId});
            res.json({ message: "User deleted!"});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};