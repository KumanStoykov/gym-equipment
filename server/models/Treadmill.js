const mongoose = require('mongoose');


const treadmillSchema = mongoose.Schema({

    brand: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    promoPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    madeIn: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    equipmentWeight: {
        type: Number,
        required: true
    },
    motorPower: {
        type: String,
        required: true
    },
    minSpeed: {
        type: Number,
        required: true
    },
    maxSpeed: {
        type: Number,
        required: true
    },
    inclineMin: {
        type: Number,
        required: true
    },
    inclineMax: {
        type: Number,
        required: true
    },
    availableLanguages: {
        type: String,
        required: true
    },
    display: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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

