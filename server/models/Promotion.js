const mongoose = require('mongoose');

const enumProducts = ['Treadmill', 'Bike', 'Rack', 'Bench', 'Dumbbell'];

const promotionSchema = mongoose.Schema({
    productType: {
        type: String,
        required: true,
        enum: enumProducts
    },
    product: {
        type: mongoose.Types.ObjectId,
        refPath: 'productType',
        required: true
    }
});

promotionSchema.set('timestamps', true);

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;