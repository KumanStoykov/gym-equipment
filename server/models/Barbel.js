const mongoose = require('mongoose');


const barbelSchema = mongoose.Schema({

    brand: {
        type: String,
        require: true
    },
    madeIn: {
        type: String,
        require: true
    },
    loadableSleeveLength: {
        type: Number,
        require: true
    },
    barLength: {
        type: Number,
        require: true
    },
    diameter: {
        type: Number,
        require: true
    },
    barType: {
        type: String,
        require: true
    },
    barUse: {
        type: String,
        require: true
    },
    barWeight: {
        type: Number,
        require: true
    },
    knurl: {
        type: String,
        require: true
    },
    shaftCoating: {
        type: String,
        require: true
    },
    sleeveCoating: {
        type: String,
        require: true
    },
    tensileStrength: {
        type: String,
        require: true
    },

});

barbelSchema.set('timestamps', true);

const Barbel = mongoose.model('Barbel', barbelSchema);

module.exports = Barbel;

