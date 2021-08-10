const mongoose = require("mongoose");

const Orders = require("../../models/commerical/order");
const Products = require("../../models/commerical/product");

// get all orders
exports.get_orders = async (req, res, next) => {
    try{
        const orders = await Orders.find();
        res.status(200).json({
            message: `fetching all orders`,
            orders: orders
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

// get order by id
exports.get_order = async (req, res, next) => {
    try{
        const order = await Orders.findById(req.params.orderId);
        res.status(200).json({
            message: `fetching order ${req.params.orderId}`,
            order: order
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

// create new order
exports.create_order = async (req, res, next) => {
    try{
        const productList = req.body.products;
        for(var a = 0; a < productList.length; a++){
            const product = await Products.findById(productList[a].productId);
            if(!product){
                res.status(404).json({
                    message: `Product ${productList[a].productId} not found`
                })
                return;
            }
        }
        var p = productList.map(product => {
            return {
                productId: product.productId,
                quantity: product.quantity
            }
        })
        const order = new Orders({
            _id: new mongoose.Types.ObjectId(),
            products: p
        })
        const result = await order.save();
        res.status(201).json({
            message: "order stored",
            createdOrder: result
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
          error: err
        });
    }
}

exports.updating_order = async (req, res, next) => {
    try{
        const id = req.params.orderId;
        const result = await Orders.findByIdAndUpdate({_id: id}, {$set: req.body});
        res.status(200).json({
            message: `${id} has been updated`,
            result: result
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.delete_order = async (req, res, next) => {
    try{
        const result = await Orders.remove({_id: req.params.orderId});
        res.status(200).json({
            message: `deleting order ${req.params.orderId}`,
            result: result
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.delete_all_order = async (req, res, next) => {
    try{
        const result = await Orders.remove({});
        res.status(200).json({
            message: `deleting all orders`,
            result: result
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}