const Bench = require('../models/Bench');
const Promotion = require('../models/Promotion');


exports.getAll = (page, sort) => Bench.find({}).sort({ createdAt: sort }).skip(page * 9).limit(9);

exports.getById = (benchId) => Bench.findById(benchId);

exports.create = (benchData) => Bench.create(benchData);

exports.createPromo = (promoType) => Promotion.create(promoType);

exports.deleteBench = (benchId) => Bench.findByIdAndDelete(benchId);

exports.count = () => Bench.countDocuments({});