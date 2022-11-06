const mongoose = require('mongoose');


const benchSchema = mongoose.Schema({

    brand: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    promoPrice: {
        type: Number,
        require: true
    },
    material: {
        type: String,
        require: true
    },
    knurl: {
        type: String,
        require: true
    },
    maximumUserWeight: {
        type: Number,
        require: true
    },
    maximumLoadUseable: {
        type: Number,
        require: true
    },
    dimensions: {
        type: String,
        require: true
    },
    netWeight: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

benchSchema.set('timestamps', true);

const Bench = mongoose.model('Bench', benchSchema);

module.exports = Bench;