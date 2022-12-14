const router = require('express').Router();

const orderService = require('../services/orderService');
const benchService = require('../services/benchService');
const bikeService = require('../services/bikeService');
const dumbbellService = require('../services/dumbbellService');
const treadmillService = require('../services/treadmillService');
const rackService = require('../services/rackService');
const loggedIn = require('../middlewares/loggedInMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');
const checkCredential = require('../middlewares/checkCredentialMiddleware');

const services = {
    'bike': bikeService,
    'bench': benchService,
    'dumbbell': dumbbellService,
    'treadmill': treadmillService,
    'rack': rackService,
}


router.get('/user/:id', loggedIn(), async (req, res) => {

    try {
        const userId = req.params.id;
        const page = Number(req?.query?.page) - 1 || 0;
        const sort = req?.query?.sort || 'desc';


        const orders = await orderService.getByUserId(userId, page, sort);
        const ordersCount = await orderService.countUser(userId);

        res.status(200).send({ orders, ordersCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


router.post('/create', checkCredential(), async (req, res) => {

    try {
        const mapped = [];
        const orderData = req.body;
        let currentUser = {};
        let delivery = 0;
        let totalCost = 0;

        if (Object.entries(orderData).some(([k, v]) => v == '')) {
            throw new Error('All fields are required!');
        }

        if (!req.user) {
            currentUser = {
                firstName: orderData.firstNameCheckout,
                lastName: orderData.lastNameCheckout,
                email: orderData.email,
                phone: orderData.phoneCheckout,
                address: orderData.addressCheckout,
            }
            orderData.guest = currentUser;
        } else {
            currentUser = req.user._id;
            orderData.user = currentUser;
        }

        for (const product of orderData.products) {

            const currentProduct = await services[product.productType].getById(product._id);
            mapped.push({
                product: currentProduct._id,
                productType: product.productType.substring(0, 1).toUpperCase() + product.productType.substring(1, product.productType.length),
                quantity: product.quantity,
                price: currentProduct.currentPrice
            });
            totalCost += currentProduct.currentPrice * product.quantity;
            totalCost >= 200 ? delivery = 0 : delivery = 30;
        }
        orderData.products = mapped;
        orderData.deliveryPrice = delivery;
        orderData.totalPrice = totalCost + delivery;

        const order = await orderService.create(orderData);

        res.status(200).send(order);

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/admin', isAdmin(), async (req, res) => {

    try {
        const page = Number(req?.query?.page) - 1 || 0;
        const sort = req?.query?.sort || 'desc';


        const orders = await orderService.getAllAdmin(page, sort);
        const ordersCount = await orderService.countAdmin();
        orders.map(order => {
            let createdAt = new Date(order.createdAt);
            let twoDay = createdAt.setDate() + 1;
            let oneWeek = createdAt.setDate() + 3;

            if (createdAt >= twoDay && createdAt < oneWeek) {
                order.status = 'sent';
            } else if (createdAt >= oneWeek) {
                order.status = 'complete';
                order.completed = 'true';
            }
        })

        res.status(200).send({ orders, ordersCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});
router.get('/admin/products/sales', isAdmin(), async (req, res) => {

    try {
        const { sales, totalSales } = await orderService.getAllSalesAdmin();


        res.status(200).send({ sales, totalSales });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});
router.get('/admin/products/volume', isAdmin(), async (req, res) => {

    try {
        const ordersReq = await orderService.volumeSales();
        const labels = [];
        const sales = [];

        for (let i = 0; i < 10; i++) {

            if (ordersReq.length !== 0) {
                let currentDate = new Date().getDate();
                let orderData = ordersReq[0]?.date.split('T')[0].slice(-2)
                let lastTenDays = currentDate - i;

                if (Number(orderData) + 1 == lastTenDays) {
                    const date = new Date(ordersReq[0].date);
                    labels.push(`Date: ${date.getDate()}/${date.getMonth() + 1} Products: ${ordersReq[0].countProducts}`);
                    sales.push(ordersReq[0].totalPrice);
                    ordersReq.shift();
                } else {
                    const date = new Date();
                    labels.push(`Date: ${date.getDate() - i}/${date.getMonth() + 1} Products: ${0}`);
                    sales.push(0);
                }

            } else {
                const date = new Date();
                labels.push(`Date: ${date.getDate() - i}/${date.getMonth() + 1} Products: ${0}`);
                sales.push(0);
            }
        }
        labels.reverse();
        sales.reverse();
        res.status(200).send({ labels, sales });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/delete/:benchId', loggedIn(), isAdmin(), async (req, res) => {


    try {
        const benchId = req.params.benchId;
        const oldBench = await benchService.getById(benchId);

        for (let image of oldBench.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        const promo = await promotionService.getCurrentProduct(oldBench._id);

        await promotionService.delete(promo._id);
        await commentService.deleteManyComments(benchId);

        const bench = await benchService.deleteBench(benchId);

        res.status(200).send({ bench });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;