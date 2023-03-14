const mongoose = require('mongoose');


const bikeSchema = mongoose.Schema({

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
    lengthBike: {
        type: String,
        required: true
    },
    equipmentWeight: {
        type: Number,
        required: true
    },
    adjustableLevelingFeet: {
        type: Number,
        required: true
    },
    resistanceSystem: {
        type: String,
        required: true
    },
    transportWheels: {
        type: Number,
        required: true
    },
    minUserLength: {
        type: Number,
        required: true
    },
    maxUserLength: {
        type: Number,
        required: true
    },
    display: {
        type: String,
        required: true
    },
    availableLanguages: {
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
            ref: 'Comment'

        }
    ]
});

bikeSchema.set('timestamps', true);

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
