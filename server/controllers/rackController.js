const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const rackService = require('../services/rackService');
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

        const racks = await rackService.getAll(page, sort, search);
        const racksCount = await rackService.count();

        res.status(200).send({ racks, racksCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/brands', async (req, res) => {

    try {
        const search = queryParamsSearch(req?.query);

        const brands = await rackService.getBrands(search);

        res.status(200).send({ brands });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const rack = await rackService.getById(id);

        res.status(200).send(rack);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


router.post('/create', loggedIn(), isAdmin(), async (req, res) => {
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

        const currentPrice = formData.promoPrice > 0 ? formData.promoPrice : formData.price;


        const rackData = {
            brand: formData.brand,
            productType: 'rack',
            price: formData.price,
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            maximumUserWeight: formData.maximumUserWeight,
            maximumLoadUseable: formData.maximumLoadUseable,
            dimensions: formData.dimensions,
            transportWheels: formData.transportWheels,
            netWeight: formData.netWeight,
            description: formData.description,
            images: imageUrl,
            comments: []
        };


        const rack = await rackService.create(rackData);

        if (rackData.promoPrice > 0) {
            await promotionService.create({ productType: 'Rack', product: rack._id });
        }
        res.status(200).send({ rack });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.put('/edit/:rackId', loggedIn(), isAdmin(), async (req, res) => {
    const form = formidable({ multiples: true });
    const imagesUrl = [];

    try {
        const rackId = req.params.rackId;
        const oldRack = await rackService.getById(rackId);

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
            for (const image of oldRack.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        const loadImages = imagesUrl.length > 0 ? imagesUrl : oldRack.images;

        const currentPrice = formData.promoPrice > 0 && formData.promoPrice < formData.price ? formData.promoPrice : formData.price;


        const rackData = {
            brand: formData.brand,
            productType: 'rack',
            price: formData.price,
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            maximumUserWeight: formData.maximumUserWeight,
            maximumLoadUseable: formData.maximumLoadUseable,
            dimensions: formData.dimensions,
            transportWheels: formData.transportWheels,
            netWeight: formData.netWeight,
            description: formData.description,
            images: loadImages,
            comments: []
        };


        const rack = await rackService.edit(rackId, rackData);


        const promo = await promotionService.getCurrentProduct(rack._id);

        if (promo.length == 0 && rackData.promoPrice > 0) {
            await promotionService.create({ productType: 'rack', product: rack._id });
        }

        if (promo.length != 0 && rackData.promoPrice == 0) {
            await promotionService.delete(promo[0]._id);
        }

        if (promo.length != 0 && rackData.promoPrice > 0 & rackData.promoPrice < rackData.price) {
            await promotionService.edit(promo[0]._id, rackData);
        }

        if (rackData.promoPrice > rackData.price) {
            throw Error('Promotion price should be less than product price!')
        }

        res.status(200).send({ rack });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/delete/:rackId', loggedIn(), isAdmin(), async (req, res) => {
    
    try {
        const rackId = req.params.rackId;
        const oldRack = await rackService.getById(rackId);

        for (let image of oldRack.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        const promo = await promotionService.getCurrentProduct(oldRack._id);

        await promotionService.delete(promo._id);
        await commentService.deleteManyComments(rackId);
        

        const rack = await rackService.deleteRack(rackId);

        res.status(200).send({ rack });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;