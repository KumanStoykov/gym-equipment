const Rack = require('../models/Rack');
const Promotion = require('../models/Promotion');

exports.getAll = (page, sort) => Rack.find({}).sort({ createdAt: sort }).skip(page * 9).limit(9);

exports.getById = (rackId) => Rack.findById(rackId);

exports.create = (rackData) => Rack.create(rackData);

exports.createPromo = (promoType) => Promotion.create(promoType);

exports.deleteRack = (rackId) => Rack.findByIdAndDelete(rackId);

exports.count = () => Rack.countDocuments({});