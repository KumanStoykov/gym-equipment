const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true
    },

});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;