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

router.post('/create', async (req, res) => {
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
            images: imageUrl,
        };

        const treadmill = await treadmillService.create(treadmillData);

        res.status(200).send(treadmill);

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

        res.status(200).send(treadmill);

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;