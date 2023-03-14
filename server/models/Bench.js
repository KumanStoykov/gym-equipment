const mongoose = require('mongoose');


const benchSchema = mongoose.Schema({

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
    maximumLoadUseable: {
        type: Number,
        required: true
    },
    threeSeatAngleSettings: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    transportWheels: {
        type: Number,
        required: true
    },
    netWeight: {
        type: Number,
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

benchSchema.set('timestamps', true);

const Bench = mongoose.model('Bench', benchSchema);

module.exports = Bench;