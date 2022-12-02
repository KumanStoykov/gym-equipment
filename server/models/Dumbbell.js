const mongoose = require('mongoose');


const dumbbellSchema = mongoose.Schema({

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
    knurl: {
        type: String,
        require: true
    },
    rangeOfAvailableWeightsFrom: {
        type: Number,
        require: true
    },
    rangeOfAvailableWeightsTo: {
        type: Number,
        require: true
    },
    rangeOfDumbbellLengthsFrom: {
        type: Number,
        require: true
    },
    rangeOfDumbbellLengthsTo: {
        type: Number,
        require: true
    },
    handleDiameterFrom: {
        type: Number,
        require: true
    },
    handleDiameterTo: {
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

dumbbellSchema.set('timestamps', true);

const Dumbbell = mongoose.model('Dumbbell', dumbbellSchema);

module.exports = Dumbbell;

