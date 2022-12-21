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

exports.getAllSalesAdmin = async () => {
    let allOrders = await Order.find({});
    let totalSales = 0;
    const sales = {
        'Treadmill': 0,
        'Bike': 0,
        'Rack': 0,
        'Bench': 0,
        'Dumbbell': 0
    };
    allOrders.map(order => {
        order.products.forEach(x => {
            sales[x.productType]++;
            totalSales++;
        });
    });
    return { sales, totalSales };
}

exports.volumeSales = () => {
    const dateReset = new Date() - new Date().setHours(0, 0, 0, 0);
    const backTen = new Date(Date.now() - 864000000 - dateReset);
    const dateNow = new Date(Date.now());

    let boundaries = [backTen]
    while (boundaries.slice(-1)[0] <= dateNow) {
        boundaries.push(
            new Date(new Date(boundaries.slice(-1)[0]).getTime() + (1000 * 60 * 60 * 24))
            )
    }
    return Order.aggregate([
        { $match: { "createdAt": { $gte: backTen } } },
        {
            $bucket: {
                boundaries: boundaries,
                groupBy: "$createdAt",
                default: "other",
                output: {
                    countProducts: { $sum: 1 },
                    totalPrice: { $sum: "$totalPrice" },
                }
            }
        },
        {
            $project: {
                totalPrice: { $ifNull: ["$totalPrice", 0] },
                countProducts: { $ifNull: ["$countProducts", 0] },
                date: { $dateToString: { date: "$_id" } },
                _id: 0,
            }
        },
    ]).sort({ date: 'desc' });
}
exports.countAdmin = () => Order.countDocuments({});

exports.countUser = (userId) => Order.countDocuments({ user: userId });

exports.getAll = () => Order.find({}); 