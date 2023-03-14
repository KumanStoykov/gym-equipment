const mongoose = require('mongoose');


const dumbbellSchema = mongoose.Schema({

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
    knurl: {
        type: String,
        required: true
    },
    rangeOfAvailableWeightsFrom: {
        type: Number,
        required: true
    },
    rangeOfAvailableWeightsTo: {
        type: Number,
        required: true
    },
    rangeOfDumbbellLengthsFrom: {
        type: Number,
        required: true
    },
    rangeOfDumbbellLengthsTo: {
        type: Number,
        required: true
    },
    handleDiameterFrom: {
        type: Number,
        required: true
    },
    handleDiameterTo: {
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

dumbbellSchema.set('timestamps', true);

const Dumbbell = mongoose.model('Dumbbell', dumbbellSchema);

module.exports = Dumbbell;

