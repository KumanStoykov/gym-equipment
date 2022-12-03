const Treadmill = require('../models/Treadmill');
const Promotion = require('../models/Promotion');

exports.getAll = (page, sort) => Treadmill.find({}).sort({ createdAt: sort }).skip(page * 9).limit(9);

exports.getById = (treadmillId) => Treadmill.findById(treadmillId);

exports.create = (treadmillData) => Treadmill.create(treadmillData);

exports.createPromo = (promoType) => Promotion.create(promoType);

exports.deleteTreadmill = (treadmillId) => Treadmill.findByIdAndDelete(treadmillId);

exports.count = () => Treadmill.countDocuments({});