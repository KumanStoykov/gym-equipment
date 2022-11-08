const mongoose = require('mongoose');


const treadMillSchema = mongoose.Schema({

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
    dimensions: {
        type: String,
        require: true
    },
    equipmentWeight: {
        type: Number,
        require: true
    },
    runningSurface: {
        type: String,
        require: true
    },
    motorPower: {
        type: String,
        require: true
    },
    minSpeed: {
        type: Number,
        require: true
    },
    maxSpeed: {
        type: Number,
        require: true
    },
    InclineMin: {
        type: Number,
        require: true
    },
    InclineMax: {
        type: Number,
        require: true
    },
    availableLanguages: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: [
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

treadMillSchema.set('timestamps', true);

const TreadMill = mongoose.model('TreadMill', treadMillSchema);

module.exports = TreadMill;

