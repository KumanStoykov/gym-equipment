const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    itemId: {
        type: String,
        require: true
    },  
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
 
});

commentSchema.set('timestamps', true);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
