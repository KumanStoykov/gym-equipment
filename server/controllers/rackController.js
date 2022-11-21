const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const rackService = require('../services/rackService');
const formidableParsePromise = require('../utils/formidableParsePromise');
const loggedIn = require('../middlewares/loggedInMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

router.get('/', async (req, res) => {

    try {
        const page = Number(req?.query?.page) - 1 || 0;
        const sort = req?.query?.sort || 'desc';

        const racks = await rackService.getAll(page, sort);
        const racksCount = await rackService.count();

        res.status(200).send({ racks, racksCount });
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
            const res = await cloudinary.uploader.upload(image.filepath);

            imageUrl.push({ url: res.url, public_id: res.public_id });
        }

        const rackData = {
            brand: formData.brand,
            price: formData.price,
            promoPrice: formData.promoPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            knurl: formData.knurl,
            maximumUserWeight: formData.maximumUserWeight,
            maximumLoadUseable: formData.maximumLoadUseable,
            dimensions: formData.dimensions,
            netWeight: formData.netWeight,
            description: formData.description,
            image: imageUrl,
        };

        if (rackData.brand.length <= 3) {
            throw new Error('Brand should be at least 3 characters long!');
        }
        if (Number(rackData.price) < 0) {
            throw new Error('Price should be positive number!');
        }
        if (Number(rackData.promoPrice) < 0) {
            throw new Error('Promo price should be positive number!');
        }
        if (rackData.madeIn.length <= 3) {
            throw new Error('Made in should be at least 3 characters long!');
        }
        if (rackData.material.length <= 3) {
            throw new Error('Material should be at least 3 characters long!');
        }
        if (rackData.knurl.length <= 3) {
            throw new Error('Knurl should be at least 3 characters long!');
        }
        if (Number(rackData.maximumUserWeight) < 0) {
            throw new Error('Maximum user weight  should be positive number!');
        }
        if (Number(rackData.maximumLoadUseable) < 0) {
            throw new Error('Maximum load useable  should be positive number!');
        }
        if (rackData.dimensions.length <= 5) {
            throw new Error('Dimension should be at least 5 characters long!');
        }
        if (Number(rackData.netWeight) < 0) {
            throw new Error('Net Weight should be positive number!');
        }
        if (rackData.description.length <= 20) {
            throw new Error('Description should be at least 20 characters long!');
        }

        const rack = await rackService.create(rackData);

        res.status(200).send({ rack });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/:rackId', loggedIn(), isAdmin(), async (req, res) => {
    const rackId = req.body.rackId;

    try {
        const oldRack = await rackService.getById(rackId);

        for (let image of oldRack.image) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        const rack = await rackService.deleteRack(rackId);

        res.status(200).send({ rack });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;