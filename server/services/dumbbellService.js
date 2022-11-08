const Dumbbell = require('../models/Dumbbell');

exports.getAll = (page, sort) => Dumbbell.find({}).sort({ createdAt: sort }).skip(page * 9).limit(9);

exports.getById = (dumbbellId) => Dumbbell.findById(dumbbellId);

exports.create = (dumbbellData) => Dumbbell.create(dumbbellData);

exports.deleteDumbbell = (dumbbellId) => Dumbbell.findByIdAndDelete(dumbbellId);

exports.count = () => Dumbbell.countDocuments({});