const mongoose = require("mongoose");
const Birthday = require("../../models/birthday/birthday");

exports.get_birthday_cards = async (req, res, next) => {
    try{
        const result = await Birthday.find();
        res.status(200).json({
            num: result.length,
            cards: result
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.create_birthday_cards = async (req, res, next) => {
    try{
        const newBirthday = new Birthday({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: new Date(req.body.birthday)
        });
        const result = await newBirthday.save();
        res.status(201).json({
            message: `creating new birthday card`,
            info: result
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.delete_birthday_cards = async (req, res, next) => {
    try{
        const result = Birthday.remove({_id: req.params.id});
        res.status(201).json({
            message: `deleting birthday card ${req.params.id}`,
            result: result
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.delete_all = async (req, res, next) => {
    try{
        const result = Birthday.remove({});
        res.status(201).json({
            message: `deleting all birthday cards`,
            result: result
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}