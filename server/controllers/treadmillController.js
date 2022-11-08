const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const treadmillService = require('../services/treadmillService');
const formidableParsePromise = require('../utils/formidableParsePromise');
const loggedIn = require('../middlewares/loggedInMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

router.get('/', async (req, res) => {

    try {
        const page = Number(req?.query?.page) - 1 || 0;
        const sort = req?.query?.sort || 'desc';

        const treadmills = await treadmillService.getAll(page, sort);
        const treadmillsCount = await treadmillService.count();

        res.status(200).send({ treadmills, treadmillsCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.post('/', loggedIn(), isAdmin(), async (req, res) => {
    const form = formidable({ multiples: true });
    const imageUrl = [];

    try {
        const [formData, incFiles] = await formidableParsePromise(req, form);

        const valueIncFile = Object.values(incFiles);

        const enterableValue = valueIncFile[0]?.length > 1 ? valueIncFile[0] : valueIncFile;

        for (let image of enterableValue) {
            const res = await cloudinary.uploader.upload(image._writeStream.path);

            imageUrl.push({ url: res.url, public_id: res.public_id });
        }

        const treadmillData = {
            brand: formData.brand,
            price: formData.price,
            promoPrice: formData.promoPrice,
            material: formData.material,
            madeIn: formData.madeIn,
            dimensions: formData.dimensions,
            equipmentWeight: formData.equipmentWeight,
            runningSurface: formData.runningSurface,
            motorPower: formData.motorPower,
            minSpeed: formData.minSpeed,
            maxSpeed: formData.maxSpeed,
            InclineMin: formData.InclineMin,
            InclineMax: formData.InclineMax,
            availableLanguages: formData.availableLanguages,
            description: formData.description,
            image: imageUrl,
        };

        if (treadmillData.brand.length <= 3) {
            throw new Error('Brand should be at least 3 characters long!');
        }
        if (Number(treadmillData.price) < 0) {
            throw new Error('Price should be positive number!');
        }
        if (Number(treadmillData.promoPrice) < 0) {
            throw new Error('Promo price should be positive number!');
        }
        if (treadmillData.madeIn.length <= 3) {
            throw new Error('Made in should be at least 3 characters long!');
        }
        if (treadmillData.material.length <= 3) {
            throw new Error('Material should be at least 3 characters long!');
        }

        if (treadmillData.knurl.length <= 3) {
            throw new Error('Knurl should be at least 3 characters long!');
        }
        if (Number(treadmillData.maximumUserWeight) < 0) {
            throw new Error('Maximum user weight  should be positive number!');
        }
        if (Number(treadmillData.maximumLoadUseable) < 0) {
            throw new Error('Maximum load useable  should be positive number!');
        }
        if (treadmillData.dimensions.length <= 5) {
            throw new Error('Dimension should be at least 5 characters long!');
        }
        if (Number(treadmillData.netWeight) < 0) {
            throw new Error('Net Weight should be positive number!');
        }
        if (treadmillData.description.length <= 20) {
            throw new Error('Description should be at least 20 characters long!');
        }

        const treadmill = await treadmillService.create(treadmillData);

        res.status(200).send({ treadmill });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/:treadmillId', loggedIn(), isAdmin(), async (req, res) => {
    const treadmillId = req.body.treadmillId;

    try {
        const oldTreadmill = await treadmillService.getById(treadmillId);

        for (let image of oldTreadmill.image) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        const treadmill = await treadmillService.deleteTreadmill(treadmillId);

        res.status(200).send({ treadmill });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;