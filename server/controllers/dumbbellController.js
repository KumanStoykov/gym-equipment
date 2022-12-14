const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const dumbbellService = require('../services/dumbbellService');
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

        const dumbbells = await dumbbellService.getAll(page, sort, search);
        const dumbbellsCount = await dumbbellService.count();

        res.status(200).send({ dumbbells, dumbbellsCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/brands', async (req, res) => {

    try {
        const search = queryParamsSearch(req?.query);

        const brands = await dumbbellService.getBrands(search);

        res.status(200).send({ brands });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const dumbbell = await dumbbellService.getById(id);

        res.status(200).send(dumbbell);
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

        const currentPrice = formData.promoPrice > 0 && formData.promoPrice < formData.price ? formData.promoPrice : formData.price;


        const dumbbellData = {
            brand: formData.brand,
            price: formData.price,
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            knurl: formData.knurl,
            rangeOfAvailableWeightsFrom: formData.rangeOfAvailableWeightsFrom,
            rangeOfAvailableWeightsTo: formData.rangeOfAvailableWeightsTo,
            rangeOfDumbbellLengthsFrom: formData.rangeOfDumbbellLengthsFrom,
            rangeOfDumbbellLengthsTo: formData.rangeOfDumbbellLengthsTo,
            handleDiameterFrom: formData.handleDiameterFrom,
            handleDiameterTo: formData.handleDiameterTo,
            description: formData.description,
            images: imageUrl,
            comments: []
        };


        const dumbbell = await dumbbellService.create(dumbbellData);

        if (dumbbellData.promoPrice > 0) {
            await promotionService.create({ productType: 'Dumbbell', product: dumbbell._id });
        }
        res.status(200).send({ dumbbell });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.put('/edit/:dumbbellId', loggedIn(), isAdmin(), async (req, res) => {
    const form = formidable({ multiples: true });
    const imagesUrl = [];

    try {
        const dumbbellId = req.params.dumbbellId;
        const oldDumbbell = await dumbbellService.getById(dumbbellId);

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
            for (const image of oldDumbbell.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        const loadImages = imagesUrl.length > 0 ? imagesUrl : oldDumbbell.images;

        const currentPrice = formData.promoPrice > 0 && formData.promoPrice < formData.price ? formData.promoPrice : formData.price;


        const dumbbellData = {
            brand: formData.brand,
            price: formData.price,
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            knurl: formData.knurl,
            rangeOfAvailableWeightsFrom: formData.rangeOfAvailableWeightsFrom,
            rangeOfAvailableWeightsTo: formData.rangeOfAvailableWeightsTo,
            rangeOfDumbbellLengthsFrom: formData.rangeOfDumbbellLengthsFrom,
            rangeOfDumbbellLengthsTo: formData.rangeOfDumbbellLengthsTo,
            handleDiameterFrom: formData.handleDiameterFrom,
            handleDiameterTo: formData.handleDiameterTo,
            description: formData.description,
            images: loadImages,
            comments: []
        };


        const dumbbell = await dumbbellService.edit(dumbbellId, dumbbellData);


        const promo = await promotionService.getCurrentProduct(dumbbell._id);

        if (promo.length == 0 && dumbbellData.promoPrice > 0) {
            await promotionService.create({ productType: 'dumbbell', product: dumbbell._id });
        }

        if (promo.length != 0 && dumbbellData.promoPrice == 0) {
            await promotionService.delete(promo[0]._id);
        }

        if (promo.length != 0 && dumbbellData.promoPrice > 0 & dumbbellData.promoPrice < dumbbellData.price) {
            await promotionService.edit(promo[0]._id, dumbbellData);
        }

        if (dumbbellData.promoPrice > dumbbellData.price) {
            throw Error('Promotion price should be less than product price!')
        }

        res.status(200).send({ dumbbell });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/delete/:dumbbellId', loggedIn(), isAdmin(), async (req, res) => {
    
    try {
        const dumbbellId = req.params.dumbbellId;
        const oldDumbbell = await dumbbellService.getById(dumbbellId);

        for (let image of oldDumbbell.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }
        const promo = await promotionService.getCurrentProduct(oldDumbbell._id);

        await promotionService.delete(promo._id);
        await commentService.deleteManyComments(dumbbellId);

        const dumbbell = await dumbbellService.deleteDumbbell(dumbbellId);

        res.status(200).send({ dumbbell });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;