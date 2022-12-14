const User = require('../models/User');
const Comment = require('../models/Comment');


exports.getById = (userId) => User.findById(userId);

exports.getByEmail = (email) => User.findOne({ email });

exports.createUser = (user) => User.create(user);

exports.editUser = async (userId, userData) => {
    const user = await User.findById(userId);
    Object.assign(user, userData);

    return user.save();
};

exports.deleteUser = async (userId) => {
    await Comment.deleteMany({ creator: userId });
    return User.findByIdAndDelete(userId);
};