const Dumbbell = require('../models/Dumbbell');
const Promotion = require('../models/Promotion');

exports.getAll = (page, sort) => Dumbbell.find({}).sort({ createdAt: sort }).skip(page * 9).limit(9);

exports.getById = (dumbbellId) => Dumbbell.findById(dumbbellId);

exports.create = (dumbbellData) => Dumbbell.create(dumbbellData);

exports.createPromo = (promoType) => Promotion.create(promoType);

exports.deleteDumbbell = (dumbbellId) => Dumbbell.findByIdAndDelete(dumbbellId);

exports.count = () => Dumbbell.countDocuments({});