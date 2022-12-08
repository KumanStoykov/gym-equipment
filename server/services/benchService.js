const Bench = require('../models/Bench');


exports.getAll = (page, sort) => Bench.find({}).sort({ createdAt: sort }).skip(page * 9).limit(9);

exports.getById = (benchId) => Bench.findById(benchId);

exports.create = (benchData) => Bench.create(benchData);

exports.deleteBench = (benchId) => Bench.findByIdAndDelete(benchId);

exports.count = () => Bench.countDocuments({});