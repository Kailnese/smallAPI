const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    products: [{
        productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: "I need fucking product ID"},
        quantity: { type: Number, default: 1}
    }]
})

module.exports = mongoose.model('Order', orderSchema);