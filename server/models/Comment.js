const mongoose = require('mongoose');

const enumProducts = ['Treadmill', 'Bike', 'Rack', 'Bench', 'Dumbbell'];

const commentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true,
        enum: enumProducts
    },  
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        refPath: 'enumProduct'
    },  
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
 
});

commentSchema.set('timestamps', true);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
