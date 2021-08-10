const mongoose = require("mongoose");

const Product = require("../../models/commerical/product");

exports.get_all_products = async (req, res, next) => {
    try{
        const products = await Product.find();
        res.status(200).json({
            products: products
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.get_product = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.productId);
        res.status(200).json({
            message: `fetching product ${req.params.productId}`,
            productInfo: product
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.create_product = async (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    try{
        const result = await product.save();
        res.status(201).json({
            message: `creating new product called ${req.body.name}`,
            product: result
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.update_product = async (req, res, next) => {
    try{    
        await Product.findByIdAndUpdate({_id: req.params.productId}, {$set: req.body});
        res.status(201).json({
            message: `updating product ${req.params.productId}`,
            updatedInfo: req.body
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.delete_product = async (req, res, next) => {
    try{
        const result = await Product.remove({_id: req.params.productId});
        res.status(200).json({
            message: `removing product with id: ${req.params.productId}`,
            result: result
        })
    }catch{
        res.status(500).json({
            error: err
        })
    }
}