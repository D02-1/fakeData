const { Schema, model } = require('mongoose');

// das schema (vorlage) für einen order
const orderSchema = new Schema({
    productId: String,
    quantity: Number
}, { timestamps: true })

    // gibt mir direkt nach dem speichern eine nachricht
    .post('save', (doc) => {
        console.log("Order ist gespeichert", doc);
    });

// das model für die orders
const orderModel = new model('Order', orderSchema, 'orders');

module.exports = orderModel;