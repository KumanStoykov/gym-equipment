const Bench = require('../models/Bench');

exports.getAll = (page, sort) => Bench.find({}).sort({ createdAt: sort }).skip(page * 9).limit(9);

exports.create = (benchData) => Bench.create(benchData);

exports.count = () => Bench.countDocuments({});