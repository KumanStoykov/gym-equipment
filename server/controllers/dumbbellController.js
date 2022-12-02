const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const dumbbellService = require('../services/dumbbellService');
const formidableParsePromise = require('../utils/formidableParsePromise');
const loggedIn = require('../middlewares/loggedInMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

router.get('/', async (req, res) => {

    try {
        const page = Number(req?.query?.page) - 1 || 0;
        const sort = req?.query?.sort || 'desc';

        const dumbbells = await dumbbellService.getAll(page, sort);
        const dumbbellsCount = await dumbbellService.count();

        res.status(200).send({ dumbbells, dumbbellsCount });
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

        const valueIncFile = Object.values(incFiles);

        const enterableValue = valueIncFile[0]?.length > 1 ? valueIncFile[0] : valueIncFile;

        for (let image of enterableValue) {
            const res = await cloudinary.uploader.upload(image.filepath);

            imageUrl.push({ url: res.url, public_id: res.public_id });
        }

        const dumbbellData = {
            brand: formData.brand,
            price: formData.price,
            promoPrice: formData.promoPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            knurl: formData.knurl,
            rangeOfAvailableWeightsFrom: formData.rangeOfAvailableWeightsFrom,
            rangeOfAvailableWeightsTo: formData.rangeOfAvailableWeightsTo,
            rangeOfDumbbellLengthsFrom: formData.rangeOfDumbbellLengthsFrom,
            rangeOfDumbbellLengthsTo: formData.rangeOfDumbbellLengthsTo,
            handleDiameterFrom: formData.handleDiameterFrom,
            handleDiameterTo: formData.handleDiameterTo,
            cylinderDiameterFrom: formData.cylinderDiameterFrom,
            cylinderDiameterTo: formData.cylinderDiameterTo,
            description: formData.description,
            images: imageUrl,
        };

        if (dumbbellData.brand.length <- 3) {
            throw new Error('Brand should be at least 3 characters long!');
        }
        if (Number(dumbbellData.price) < 0) {
            throw new Error('Price should be positive number!');
        }
        if (Number(dumbbellData.promoPrice) < 0) {
            throw new Error('Promo price should be positive number!');
        }
        if (dumbbellData.madeIn.length <= 3) {
            throw new Error('Made in should be at least 3 characters long!');
        }
        if (dumbbellData.material.length <= 3) {
            throw new Error('Material should be at least 3 characters long!');
        }
        if (dumbbellData.knurl.length <= 3) {
            throw new Error('Knurl should be at least 3 characters long!');
        }
        if (Number(dumbbellData.rangeOfAvailableWeightsFrom) < 0) {
            throw new Error('Range Of Available Weights From should be positive number!');
        }
        if (Number(dumbbellData.rangeOfAvailableWeightsTo) < 0) {
            throw new Error('Range Of Available Weights To should be positive number!');
        }
        if (Number(dumbbellData.rangeOfDumbbellLengthsFrom) < 0) {
            throw new Error('Range Of Dumbbell Lengths From should be positive number!');
        }
        if (Number(dumbbellData.rangeOfDumbbellLengthsTo) < 0) {
            throw new Error('Range Of Dumbbell Lengths To should be positive number!');
        }

        if (dumbbellData.handleDiameterFrom.length < 0) {
            throw new Error('Handle Diameter From should be positive number!');
        }
        if (Number(dumbbellData.handleDiameterTo) < 0) {
            throw new Error('Handle Diameter to should be positive number!');
        }

        if (Number(dumbbellData.cylinderDiameterFrom) < 0) {
            throw new Error('Cylinder Diameter From should be positive number!');
        }
        if (Number(dumbbellData.cylinderDiameterTo) < 0) {
            throw new Error('Cylinder Diameter to should be positive number!');
        }

        if (dumbbellData.description.length <= 20) {
            throw new Error('Description should be at least 20 characters long!');
        }

        const dumbbell = await dumbbellService.create(dumbbellData);

        res.status(200).send({ dumbbell });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/:dumbbellId', loggedIn(), isAdmin(), async (req, res) => {
    const dumbbellId = req.body.dumbbellId;

    try {
        const oldDumbbell = await dumbbellService.getById(dumbbellId);

        for(let image of oldDumbbell.image) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        const dumbbell = await dumbbellService.deleteDumbbell(dumbbellId);

        res.status(200).send({ dumbbell });

    }catch(err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;