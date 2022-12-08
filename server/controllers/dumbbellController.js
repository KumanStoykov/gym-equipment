const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const dumbbellService = require('../services/dumbbellService');
const promotionService = require('../services/promotionService');
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
            description: formData.description,
            images: imageUrl,
            comments: []
        };

        
        const dumbbell = await dumbbellService.create(dumbbellData);
        
        if(dumbbellData.promoPrice > 0) {
            await promotionService.create({ productType: 'Dumbbell', product: dumbbell._id });
        }
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