const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;


const benchService = require('../services/benchService');
const formidableParsePromise = require('../utils/formidableParsePromise');

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

router.post('/', async (req, res) => {
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

        const benchData = {
            brand: formData.brand,
            price: formData.price,
            promoPrice: formData.promoPrice,
            material: formData.material,
            knurl: formData.knurl,
            maximumUserWeight: formData.maximumUserWeight,
            maximumLoadUseable: formData.maximumLoadUseable,
            dimensions: formData.dimensions,
            netWeight: formData.netWeight,
            description: formData.description,
            image: imageUrl,
        };

        if (benchData.brand.length <= 3) {
            throw new Error('Brand should be at least 3 characters long!');
        }
        if (Number(benchData.price) < 0) {
            throw new Error('Price should be positive number!');
        }
        if (Number(benchData.promoPrice) < 0) {
            throw new Error('Promo price should be positive number!');
        }
        if (benchData.material.length <= 3) {
            throw new Error('Material should be at least 3 characters long!');
        }
        if (benchData.knurl.length <= 3) {
            throw new Error('Knurl should be at least 3 characters long!');
        }
        if (Number(benchData.maximumUserWeight) < 0) {
            throw new Error('Maximum user weight  should be positive number!');
        }
        if (Number(benchData.maximumLoadUseable) < 0) {
            throw new Error('Maximum load useable  should be positive number!');
        }
        if (benchData.dimensions.length <= 5) {
            throw new Error('Dimension should be at least 5 characters long!');
        }
        if (Number(benchData.netWeight) < 0) {
            throw new Error('Net Weight should be positive number!');
        }
        if (benchData.description.length <= 20) {
            throw new Error('Description should be at least 20 characters long!');
        }

        const bench = await benchService.create(benchData);

        res.status(200).send({ bench });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/:benchId', async (req, res) => {
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