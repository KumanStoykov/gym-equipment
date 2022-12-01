const mongoose = require('mongoose');


const rackSchema = mongoose.Schema({

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
    madeIn: {
        type: String,
        require: true
    },
    material: {
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
    transportWheels: {
        type: Number,
        require: true
    },
    netWeight: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: [
        {
            url: {
                type: String
            },
            public_id: {
                type: String
            }
        }
    ]
});

rackSchema.set('timestamps', true);

const Rack = mongoose.model('Rack', rackSchema);

module.exports = Rack;