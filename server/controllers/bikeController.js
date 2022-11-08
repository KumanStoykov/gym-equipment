const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const bikeService = require('../services/bikeService');
const formidableParsePromise = require('../utils/formidableParsePromise');
const loggedIn = require('../middlewares/loggedInMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

router.get('/', async (req, res) => {

    try {
        const page = Number(req?.query?.page) - 1 || 0;
        const sort = req?.query?.sort || 'desc';

        const bikes = await bikeService.getAll(page, sort);
        const bikesCount = await bikeService.count();

        res.status(200).send({ bikes, bikesCount });
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

        const bikeData = {
            brand: formData.brand,
            price: formData.price,
            promoPrice: formData.promoPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            lengthBike: formData.lengthBike,
            equipmentWeight: formData.equipmentWeight,
            adjustableLevelingFeet: formData.adjustableLevelingFeet,
            resistanceSystem: formData.resistanceSystem,
            transportWheels: formData.transportWheels,
            connectivity: formData.connectivity,
            minUserLength: formData.minUserLength,
            maxUserLength: formData.maxUserLength,
            display: formData.display,
            availableLanguages: formData.availableLanguages,
            description: formData.description,
            image: imageUrl,
        };

        if (bikeData.brand.length <- 3) {
            throw new Error('Brand should be at least 3 characters long!');
        }
        if (Number(bikeData.price) < 0) {
            throw new Error('Price should be positive number!');
        }
        if (Number(bikeData.promoPrice) < 0) {
            throw new Error('Promo price should be positive number!');
        }
        if (bikeData.madeIn.length <= 3) {
            throw new Error('Made in should be at least 3 characters long!');
        }
        if (bikeData.material.length <= 3) {
            throw new Error('Material should be at least 3 characters long!');
        }
        if (bikeData.lengthBike.length <= 3) {
            throw new Error('Length should be at least 3 characters long!');
        }
        if (Number(bikeData.equipmentWeight) < 0) {
            throw new Error('Equipment weight should be positive number!');
        }
        if (Number(bikeData.adjustableLevelingFeet) < 0) {
            throw new Error('Adjustable leveling feet should be positive number!');
        }
        if (bikeData.resistanceSystem.length <= 3) {
            throw new Error('Resistance system should be at least 3 characters long!');
        }
        if (Number(bikeData.transportWheels) < 0) {
            throw new Error('Transport wheels should be positive number!');
        }
        if (Number(bikeData.connectivity) < 0) {
            throw new Error('Connectivity should be positive number!');
        }
        if (Number(bikeData.minUserLength) < 0) {
            throw new Error('Min user length should be positive number!');
        }
        if (Number(bikeData.maxUserLength) < 0) {
            throw new Error('Max user length should be positive number!');
        }
        if (Number(bikeData.display) < 3) {
            throw new Error('Display should be at 3 characters long!');
        }
        if (Number(availableLanguages.display) < 6) {
            throw new Error('Display should be at 6 characters long!');
        }
        if (bikeData.description.length <= 20) {
            throw new Error('Description should be at least 20 characters long!');
        }

        const bike = await bikeService.create(bikeData);

        res.status(200).send({ bike });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/:bikeId', loggedIn(), isAdmin(), async (req, res) => {
    const bikeId = req.body.bikeId;

    try {
        const oldBike = await bikeService.getById(bikeId);

        for(let image of oldBike.image) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        const bike = await bikeService.deleteBike(bikeId);

        res.status(200).send({ bike });

    }catch(err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;