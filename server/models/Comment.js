const mongoose = require('mongoose');

const enumProducts = ['Treadmill', 'Bike', 'Rack', 'Bench', 'Dumbbell'];

const commentSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    productName: {
        type: String,
        require: true,
        enum: enumProducts
    },  
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
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
