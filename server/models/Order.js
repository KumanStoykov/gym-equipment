const mongoose = require('mongoose');

const enumProducts = ['Treadmill', 'Bike', 'Rack', 'Bench', 'Dumbbell'];

const orderSchema = mongoose.Schema({

    guest: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        }
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    products: [{
        productType: {
            type: String,
            required: true,
            enum: enumProducts
        },
        product: {
            type: mongoose.Types.ObjectId,
            refPath: 'products.productType',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: { 
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        default: 'pending'
    },
    completed: {
        type: Boolean,
        default: false
    },
    deliveryPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number
    }
 
});

orderSchema.set('timestamps', true);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
