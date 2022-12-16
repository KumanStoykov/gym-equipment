const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const bikeService = require('../services/bikeService');
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

        const bikes = await bikeService.getAll(page, sort, search);
        const bikesCount = await bikeService.count();

        res.status(200).send({ bikes, bikesCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});
router.get('/brands', async (req, res) => {

    try {
        const search = queryParamsSearch(req?.query);

        const brands = await bikeService.getBrands(search);

        res.status(200).send({ brands });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const bike = await bikeService.getById(id);

        res.status(200).send(bike);
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


        const bikeData = {
            brand: formData.brand,
            productType: 'bike',
            price: formData.price,
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            lengthBike: formData.lengthBike,
            equipmentWeight: formData.equipmentWeight,
            adjustableLevelingFeet: formData.adjustableLevelingFeet,
            resistanceSystem: formData.resistanceSystem,
            transportWheels: formData.transportWheels,
            minUserLength: formData.minUserLength,
            maxUserLength: formData.maxUserLength,
            display: formData.display,
            availableLanguages: formData.availableLanguages,
            description: formData.description,
            images: imageUrl,
            comments: []
        };

        const bike = await bikeService.create(bikeData);

        if (bikeData.promoPrice > 0) {
            await promotionService.create({ productType: 'Bike', product: bike._id });
        }

        res.status(200).send({ bike });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.put('/edit/:bikeId', loggedIn(), isAdmin(), async (req, res) => {
    const form = formidable({ multiples: true });
    const imagesUrl = [];

    try {
        const bikeId = req.params.bikeId;
        const oldBike = await bikeService.getById(bikeId);

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
            for (const image of oldBike.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        const loadImages = imagesUrl.length > 0 ? imagesUrl : oldBike.images;

        const currentPrice = formData.promoPrice > 0 && formData.promoPrice < formData.price ? formData.promoPrice : formData.price;


        const bikeData = {
            brand: formData.brand,
            price: formData.price,
            productType: 'bike',
            promoPrice: formData.promoPrice,
            currentPrice: currentPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            lengthBike: formData.lengthBike,
            equipmentWeight: formData.equipmentWeight,
            adjustableLevelingFeet: formData.adjustableLevelingFeet,
            resistanceSystem: formData.resistanceSystem,
            transportWheels: formData.transportWheels,
            minUserLength: formData.minUserLength,
            maxUserLength: formData.maxUserLength,
            display: formData.display,
            availableLanguages: formData.availableLanguages,
            description: formData.description,
            images: loadImages,
            comments: []
        };


        const bike = await bikeService.edit(bikeId, bikeData);


        const promo = await promotionService.getCurrentProduct(bike._id);

        if (promo.length == 0 && bikeData.promoPrice > 0) {
            await promotionService.create({ productType: 'bike', product: bike._id });
        }

        if (promo.length != 0 && bikeData.promoPrice == 0) {
            await promotionService.delete(promo[0]._id);
        }

        if (promo.length != 0 && bikeData.promoPrice > 0 & bikeData.promoPrice < bikeData.price) {
            await promotionService.edit(promo[0]._id, bikeData);
        }

        if (bikeData.promoPrice > bikeData.price) {
            throw Error('Promotion price should be less than product price!')
        }

        res.status(200).send({ bike });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/delete/:bikeId', loggedIn(), isAdmin(), async (req, res) => {
    
    try {
        const bikeId = req.params.bikeId;
        const oldBike = await bikeService.getById(bikeId);

        for (let image of oldBike.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        const promo = await promotionService.getCurrentProduct(oldBike._id);

        await promotionService.delete(promo._id);
        await commentService.deleteManyComments(bikeId);

        const bike = await bikeService.deleteBike(bikeId);

        res.status(200).send({ bike });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;