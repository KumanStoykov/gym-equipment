const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const rackService = require('../services/rackService');
const promotionService = require('../services/promotionService');
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
        
        if(requiredFields.length > 0) {
            throw new Error('All fields is required!')
        } 

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
        
        if(rackData.promoPrice > 0) {
            await promotionService.create({ productType: 'Rack', product: rack._id });
        }
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