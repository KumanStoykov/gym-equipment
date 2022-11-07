const Bike = require('../models/Bike');

exports.getAll = (page, sort) => Bike.find({}).sort({ createdAt: sort }).skip(page * 9).limit(9);

exports.getById = (bikeId) => Bike.findById(bikeId);

exports.create = (bikeData) => Bike.create(bikeData);

exports.deleteBike = (bikeId) => Bike.findByIdAndDelete(bikeId);

exports.count = () => Bike.countDocuments({});