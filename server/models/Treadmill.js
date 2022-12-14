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

treadMillSchema.set('timestamps', true);

const TreadMill = mongoose.model('TreadMill', treadMillSchema);

module.exports = TreadMill;

