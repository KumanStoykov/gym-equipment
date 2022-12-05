const Promotion = require('../models/Promotion');


exports.getAll = (page, sort) => Promotion.find({})
    .sort({ createdAt: sort })
    .skip(page * 9)
    .limit(9)
    .populate('product');

exports.getThreeLatest = () => Promotion.find({})
    .sort({ createdAt: 'desc' })
    .limit(3)
    .populate('product');


exports.getById = (promotionId) => Promotion.findById(promotionId).populate('product');


exports.create = (promoData) => Promotion.create(promoData);

exports.deletePromotion = (promotionId) => Promotion.findByIdAndDelete(promotionId);

exports.count = () => Promotion.countDocuments({});