const mongoose = require('mongoose');


const treadMillsSchema = mongoose.Schema({

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
    madeIn: {
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

treadMillsSchema.set('timestamps', true);

const TreadMills = mongoose.model('TreadMills', treadMillsSchema);

module.exports = TreadMills;

