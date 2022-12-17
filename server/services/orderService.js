const Order = require('../models/Order');

exports.create = (orderData) => Order.create(orderData);

exports.getAllAdmin = (page, sort) => Order.find({})
    .sort({ createdAt: sort })
    .skip(10 * page)
    .limit(10)
    .populate('products.product');

exports.getByUserId = (userId, page, sort) => Order.find({ user: userId })
    .sort({ createdAt: sort })
    .skip(10 * page)
    .limit(10)
    .populate('products.product');

exports.countAdmin = () => Order.countDocuments({});

exports.countUser = (userId) => Order.countDocuments({ user: userId });

exports.getAll = () => Order.find({}); 