const Order = require('../models/Order');

exports.create = (orderData) => Order.create(orderData);

exports.getAllAdmin = (page, sort) => Order.find({})
.sort({ createdAt: sort })
.skip(10 * page)
.limit(10)
.populate('products.product');


exports.count = () => Order.countDocuments(); 

exports.getAll = () => Order.find({}); 