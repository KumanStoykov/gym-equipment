const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const benchService = require('../services/benchService');
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

        const benches = await benchService.getAll(page, sort, search);
        const benchesCount = await benchService.count();

        res.status(200).send({ benches, benchesCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/brands', async (req, res) => {

    try {
        const search = queryParamsSearch(req?.query);

        const brands = await benchService.getBrands(search);

        res.status(200).send({ brands });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const bench = await benchService.getById(id);

        res.status(200).send(bench);
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

        const benchData = {
            brand: formData.brand,
            productType: 'bench',
            price: formData.price,
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            maximumLoadUseable: formData.maximumLoadUseable,
            threeSeatAngleSettings: formData.threeSeatAngleSettings,
            dimensions: formData.dimensions,
            transportWheels: formData.transportWheels,
            netWeight: formData.netWeight,
            description: formData.description,
            images: imageUrl,
            comments: []
        };


        const bench = await benchService.create(benchData);

        if (benchData.promoPrice > 0 && benchData.promoPrice < benchData.price) {
            await promotionService.create({ productType: 'Bench', product: bench._id });
        }

        res.status(200).send({ bench });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});
router.put('/edit/:benchId', loggedIn(), isAdmin(), async (req, res) => {
    const form = formidable({ multiples: true });
    const imagesUrl = [];

    try {
        const benchId = req.params.benchId;
        const oldBench = await benchService.getById(benchId);

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
            for (const image of oldBench.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        const loadImages = imagesUrl.length > 0 ? imagesUrl : oldBench.images;

        const currentPrice = formData.promoPrice > 0 && formData.promoPrice < formData.price ? formData.promoPrice : formData.price;


        const benchData = {
            brand: formData.brand,
            price: formData.price,
            productType: 'bench',
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            maximumLoadUseable: formData.maximumLoadUseable,
            threeSeatAngleSettings: formData.threeSeatAngleSettings,
            dimensions: formData.dimensions,
            transportWheels: formData.transportWheels,
            netWeight: formData.netWeight,
            description: formData.description,
            images: loadImages,
            comments: []
        };


        const bench = await benchService.edit(benchId, benchData);


        const promo = await promotionService.getCurrentProduct(bench._id);

        if (promo.length == 0 && benchData.promoPrice > 0) {
            await promotionService.create({ productType: 'Bench', product: bench._id });
        }
        
        if (promo.length != 0 && benchData.promoPrice == 0) {
           await promotionService.delete(promo[0]._id);
        }

        if (promo.length != 0  && benchData.promoPrice > 0 & benchData.promoPrice < benchData.price) {
            await promotionService.edit(promo[0]._id, benchData);
        }

        if (benchData.promoPrice > benchData.price) {
            throw Error('Promotion price should be less than product price!')
        }

        res.status(200).send({ bench });

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