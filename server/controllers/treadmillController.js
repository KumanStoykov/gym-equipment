const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const treadmillService = require('../services/treadmillService');
const promotionService = require('../services/promotionService');
const commentService = require('../services/commentService');
const formidableParsePromise = require('../utils/formidableParsePromise');
const loggedIn = require('../middlewares/loggedInMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');
const { queryParamsSearch } = require('../utils/queryPramsSearchUtil');

router.get('/', async (req, res) => {

    try {
        const page = Number(req?.query?.page) - 1 || 0;
        const sort = req?.query?.sort || 'desc';

        const search = queryParamsSearch(req?.query);

        const treadmills = await treadmillService.getAll(page, sort, search);
        const treadmillsCount = await treadmillService.count(search);

        res.status(200).send({ treadmills, treadmillsCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/brands', async (req, res) => {
    try {
        const search = queryParamsSearch(req?.query);

        const brands = await treadmillService.getBrands(search);

        res.status(200).send({ brands });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const treadmill = await treadmillService.getById(id);

        res.status(200).send(treadmill);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.post('/create', async (req, res) => {
    const form = formidable({ multiples: true });
    const imageUrl = [];
    try {
        const [formData, incFiles] = await formidableParsePromise(req, form);

        const requiredFields = Object.entries(formData).filter(([k, v]) => v === '');

        if (requiredFields.length > 0) {
            throw new Error('All fields is required!')
        }

        const valueIncFile = Object.values(incFiles);

        const enterableValue = valueIncFile[0]?.length > 1 ? valueIncFile[0] : valueIncFile;

        for (let image of enterableValue) {

            const res = await cloudinary.uploader.upload(image.filepath);

            imageUrl.push({ url: res.url, public_id: res.public_id });
        }

        const currentPrice = formData.promoPrice > 0 && formData.promoPrice < formData.price ? formData.promoPrice : formData.price;



        const treadmillData = {
            brand: formData.brand,
            productType: 'treadmill',
            price: formData.price,
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            material: formData.material,
            madeIn: formData.madeIn,
            dimensions: formData.dimensions,
            equipmentWeight: formData.equipmentWeight,
            motorPower: formData.motorPower,
            minSpeed: formData.minSpeed,
            maxSpeed: formData.maxSpeed,
            inclineMin: formData.inclineMin,
            inclineMax: formData.inclineMax,
            availableLanguages: formData.availableLanguages,
            display: formData.display,
            description: formData.description,
            images: imageUrl,
            comments: []
        };


        const treadmill = await treadmillService.create(treadmillData);

        if (treadmillData.promoPrice > 0 && treadmillData.promoPrice < treadmillData.price) {
            await promotionService.create({ productType: 'Treadmill', product: treadmill._id });
        }
        res.status(200).send(treadmill);

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.put('/edit/:treadmillId', loggedIn(), isAdmin(), async (req, res) => {
    const form = formidable({ multiples: true });
    const imagesUrl = [];

    try {
        const treadmillId = req.params.treadmillId;
        const oldTreadmill = await treadmillService.getById(treadmillId);

        const [formData, incFiles] = await formidableParsePromise(req, form);

        const requiredFields = Object.entries(formData).filter(([k, v]) => v === '');

        if (requiredFields.length > 0) {
            throw new Error('All fields is required!')
        }

        const valueIncFile = Object.values(incFiles);

        const enterableValue = valueIncFile[0]?.length > 1 ? valueIncFile[0] : valueIncFile;

        if (valueIncFile?.length) {
            for (const image of enterableValue) {
                const res = await cloudinary.uploader.upload(image.filepath);

                imagesUrl.push({ url: res.url, public_id: res.public_id });
            }
            for (const image of oldTreadmill.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        const loadImages = imagesUrl.length > 0 ? imagesUrl : oldTreadmill.images;

        const currentPrice = formData.promoPrice > 0 && formData.promoPrice < formData.price ? formData.promoPrice : formData.price;


        const treadmillData = {
            brand: formData.brand,
            productType: 'treadmill',
            price: formData.price,
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            material: formData.material,
            madeIn: formData.madeIn,
            dimensions: formData.dimensions,
            equipmentWeight: formData.equipmentWeight,
            motorPower: formData.motorPower,
            minSpeed: formData.minSpeed,
            maxSpeed: formData.maxSpeed,
            inclineMin: formData.inclineMin,
            inclineMax: formData.inclineMax,
            availableLanguages: formData.availableLanguages,
            display: formData.display,
            description: formData.description,
            images: loadImages,
            comments: []
        };


        const treadmill = await treadmillService.edit(treadmillId, treadmillData);

        const promo = await promotionService.getCurrentProduct(treadmill._id);

        if (promo.length == 0 && treadmillData.promoPrice > 0) {
            await promotionService.create({ productType: 'treadmill', product: treadmill._id });
        }

        if (promo.length != 0 && treadmillData.promoPrice == 0) {
            await promotionService.delete(promo[0]._id);
        }

        if (promo.length != 0 && treadmillData.promoPrice > 0 & treadmillData.promoPrice < treadmillData.price) {
            await promotionService.edit(promo[0]._id, treadmillData);
        }

        if (treadmillData.promoPrice > treadmillData.price) {
            throw Error('Promotion price should be less than product price!')
        }

        res.status(200).send({ treadmill });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/delete/:treadmillId', loggedIn(), isAdmin(), async (req, res) => {

    try {
        const treadmillId = req.params.treadmillId;
        const oldTreadmill = await treadmillService.getById(treadmillId);

        for (let image of oldTreadmill.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        const promo = await promotionService.getCurrentProduct(oldTreadmill._id);

        await promotionService.delete(promo._id);
        await commentService.deleteManyComments(treadmillId);


        const treadmill = await treadmillService.deleteTreadmill(treadmillId);

        res.status(200).send(treadmill);

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;