const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: `product name is required` },
    price: { type: Number, required: 'product price is required' },
    productImage: { type: String }
})

module.exports = mongoose.model('Product', productSchema);