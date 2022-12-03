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
        
        if(requiredFields.length > 0) {
            throw new Error('All fields is required!')
        } 

        const valueIncFile = Object.values(incFiles);

        const enterableValue = valueIncFile[0]?.length > 1 ? valueIncFile[0] : valueIncFile;

        for (let image of enterableValue) {
            const res = await cloudinary.uploader.upload(image.filepath);

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
            minUserLength: formData.minUserLength,
            maxUserLength: formData.maxUserLength,
            display: formData.display,
            availableLanguages: formData.availableLanguages,
            description: formData.description,
            images: imageUrl,
            comments: []
        };

        if(bikeData.promoPrice > 0) {
            await bikeService.createPromo({ productType: 'Bike'});
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