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
    madeIn: {
        type: String,
        require: true
    },
    material: {
        type: String,
        require: true
    },
    maximumLoadUseable: {
        type: Number,
        require: true
    },
    threeSeatAngleSettings: {
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