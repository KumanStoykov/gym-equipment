const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const benchService = require('../services/benchService');
const promotionService = require('../services/promotionService');
const formidableParsePromise = require('../utils/formidableParsePromise');
const loggedIn = require('../middlewares/loggedInMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

router.get('/', async (req, res) => {

    try {
        const page = Number(req?.query?.page) - 1 || 0;
        const sort = req?.query?.sort || 'desc';

        const benches = await benchService.getAll(page, sort);
        const benchesCount = await benchService.count();

        res.status(200).send({ benches, benchesCount });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id
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
        
        if(requiredFields.length > 0) {
            throw new Error('All fields is required!')
        } 

        const valueIncFile = Object.values(incFiles);

        const enterableValue = valueIncFile[0]?.length > 1 ? valueIncFile[0] : valueIncFile;

        for (let image of enterableValue) {
            const res = await cloudinary.uploader.upload(image._writeStream.path);

            imageUrl.push({ url: res.url, public_id: res.public_id });
        }

        const benchData = {
            brand: formData.brand,
            price: formData.price,
            promoPrice: formData.promoPrice,
            madeIn: formData.madeIn,
            material: formData.material,
            maximumLoadUseable: formData.maximumLoadUseable,
            threeSeatAngleSettings: formData.threeSeatAngleSettings,
            dimensions: formData.dimensions,
            transportWheels: formData.transportWheels,
            netWeight: formData.netWeight,
            description: formData.description,
            image: imageUrl,
            comments: []
        };        
        
        
        const bench = await benchService.create(benchData);

        if(benchData.promoPrice > 0) {
            await promotionService.create({ productType: 'Bench', product: bench._id });
        }

        res.status(200).send({ bench });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/:benchId', loggedIn(), isAdmin(), async (req, res) => {
    const benchId = req.body.benchId;

    try {
        const oldBench = await benchService.getById(benchId);

        for(let image of oldBench.image) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        const bench = await benchService.deleteBench(benchId);

        res.status(200).send({ bench });

    }catch(err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;