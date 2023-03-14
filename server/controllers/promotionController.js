const router = require('express').Router();

const promotionService = require('../services/promotionService');
const { queryParamsSearch } = require('../utils/queryPramsSearchUtil');


router.get('/', async (req, res) => {

    try {
        const page = Number(req?.query?.page) - 1 || 0;
        const sort = req?.query?.sort || 'desc';
        const search = queryParamsSearch(req.query);

        const promotions = await promotionService.getAll(page, sort, search);
        const promotionsCount = await promotionService.count();
        res.status(200).send({ promotions, promotionsCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/threeLatest', async (req, res) => {

    try {

        const promotions = await promotionService.getThreeLatest();

        res.status(200).send(promotions);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        const search = queryParamsSearch(req?.query);
        const products = await promotionService.getProductsType(search);

        res.status(200).send({ products });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const promotion = await promotionService.getById(id);

        res.status(200).send(promotion);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


module.exports = router;