const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema



const productCartSchema = mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'product'
    },
    name: String,
    quantity: Number,
    price: Number
});



const orderSchema = mongoose.Schema({
    products: [productCartSchema],
    transication_id: { type: String },
    amount: { type: Number },
    address: String,
    updated: Date,
    status: {
        type: String,
        default: "",
        enum: ["Cancel", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);
const Cart = mongoose.model('Cart', productCartSchema);
module.exports = {
    Order,
    Cart
}