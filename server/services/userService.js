const User = require('../models/User');


exports.getById = (userId) => User.findById(userId);

exports.getByEmail = (email) => User.find({ email: email });

exports.createUser = (email, password) => User.create(email, password);