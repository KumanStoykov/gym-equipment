const Promotion = require('../models/Promotion');


exports.getAll = (page, sort, search) => Promotion.find({ ...search })
    .sort({ currentPrice: sort })
    .skip(page * 6)
    .limit(6)
    .populate({
        path: 'product',
        populate: {
            path: 'comments',
            model: 'Comment'
        },
    });

exports.getThreeLatest = () => Promotion.find({})
    .sort({ createdAt: 'desc' }) 
    .limit(3)
    .populate({
        path: 'product',
        populate: {
            path: 'comments',
            model: 'Comment'
        },
    });


exports.getById = (promotionId) => Promotion.findById(promotionId).populate('product');


exports.getCurrentProduct = (productId) => Promotion.find({ product: productId }).populate('product');


exports.create = (promoData) => Promotion.create(promoData);

exports.edit = (promotionId, promoData) => Promotion.findByIdAndUpdate(promotionId, promoData);

exports.deletePromotion = (promotionId) => Promotion.findByIdAndDelete(promotionId);

exports.count = () => Promotion.countDocuments({});

exports.getProductsType = (search) => Promotion.findOne({ ...search }).select('productType').distinct('productType');

exports.delete = (promotionId) => Promotion.findByIdAndDelete(promotionId);

