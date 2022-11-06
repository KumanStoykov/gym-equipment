const User = require('../models/User');


exports.getById = (userId) => User.findById(userId);

exports.getByEmail = (email) => User.find({ email: email });

exports.createUser = (user) => User.create(user);