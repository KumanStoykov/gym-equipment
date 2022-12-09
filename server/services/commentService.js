const Comment = require('../models/Comment');
const Bench = require('../models/Bench');
const Bike = require('../models/Bike');
const Dumbbell = require('../models/Dumbbell');
const Rack = require('../models/Rack');
const Treadmill = require('../models/Treadmill');

exports.getAllCurrentItem = (productId) => Comment.find({ productId });

exports.getById = (commentId) => Comment.findById(commentId);

exports.getComments = (page, productId) => Comment.find({ productId })
    .sort({ createAt: 'desc' })
    .skip(page * 6)
    .limit(6);

exports.getCount = (productId) => Comment.find({ productId });

exports.create = (data) => Comment.create(data);

exports.update = (commentId, data) => Comment.findByIdAndUpdate(commentId, data);

exports.delete = (commentId) => Comment.findByIdAndDelete(commentId);


exports.updateComments = async (commentData) => {

    if (commentData.productName === 'Bench') {
        let bench = await Bench.findById(commentData.productId);

        bench.comments.push(commentData._id);

        return await bench.save();

    } else if (commentData.productName === 'Bike') {
        let bike = await Bike.findById(commentData.productId);

        bike.comments.push(commentData._id);

        return await bike.save();

    } else if (commentData.productName === 'Dumbbell') {
        let dumbbell = await Dumbbell.findById(commentData.productId);

        dumbbell.comments.push(commentData._id);

        return await dumbbell.save();

    } else if (commentData.productName === 'Rack') {
        let rack = await Rack.findById(commentData.productId);

        rack.comments.push(commentData._id);

        return await rack.save();

    } else if (commentData.productName === 'Treadmill') {
        let treadmill = await Treadmill.findById(commentData.productId);
        treadmill.comments.push(commentData._id);

        return await treadmill.save();
    }
}
