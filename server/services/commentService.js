const Comment = require('../models/Comment');
const Bench = require('../models/Bench');
const Bike = require('../models/Bike');
const Dumbbell = require('../models/Dumbbell');
const Rack = require('../models/Rack'); 
const Treadmill = require('../models/Treadmill');

const modelsObj = {
    'Bench': (commentData) => Bench.findOne({ _id: commentData.productId }),
    'Bike': (commentData) => Bike.findOne({ _id: commentData.productId }),
    'Dumbbell': (commentData) => Dumbbell.findOne({ _id: commentData.productId }),
    'Rack': (commentData) => Rack.findOne({ _id: commentData.productId }),
    'Treadmill': (commentData) => Treadmill.findOne({ _id: commentData.productId }),
}

exports.getAllCurrentItem = (productId) => Comment.find({ productId }).sort({ createdAt: 'desc' });

exports.getById = (commentId) => Comment.findById(commentId);

exports.getComments = (page, productId) => Comment.find({ productId })
    .sort({ createdAt: 'desc' })
    .skip(page * 6)
    .limit(6);

exports.getCount = (productId) => Comment.find({ productId });

exports.create = (commentData) => Comment.create(commentData);

exports.update = async (commentId, commentData) => {
    const oldComment = await Comment.findById(commentId);

    Object.assign(oldComment, commentData);

    return oldComment.save();
};

exports.deleteComment = (commentId) => Comment.findByIdAndDelete(commentId);

exports.deleteManyComments = (productId) => Comment.deleteMany({ productId });


exports.updateProductComments = async (commentData) => {
    const modelFunction = modelsObj[commentData.productName];
    const currentModel = await modelFunction(commentData);

    currentModel.comments.push(commentData._id);
    return currentModel.save();
}

exports.deleteProductComments = async (commentData) => {

    const modelFunction = modelsObj[commentData.productName];
    const currentModel = await modelFunction(commentData);

    currentModel.comments = currentModel.comments.filter(com => com._id.toString() !== commentData._id.toString());
    return currentModel.save();
}
