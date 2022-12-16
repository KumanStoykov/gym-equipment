const mongoose = require('mongoose');


const treadmillSchema = mongoose.Schema({

    brand: {
        type: String,
        require: true
    },
    productType: {
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
    currentPrice: {
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
    inclineMin: {
        type: Number,
        require: true
    },
    inclineMax: {
        type: Number,
        require: true
    },
    availableLanguages: {
        type: String,
        require: true
    },
    display: {
        type: String,
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
    ],
    comments: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Comment',
        }
    ]

});

treadmillSchema.set('timestamps', true);

const Treadmill = mongoose.model('Treadmill', treadmillSchema);

module.exports = Treadmill;

