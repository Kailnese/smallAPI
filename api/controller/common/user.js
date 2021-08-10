const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/common/user");

exports.get_users = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            users: users
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.login = async (req, res, next) => {
    try{
        const user = await User.find({email: req.body.email});
        if(user.length < 1){
            res.status(401).json({
                message: "password or email you enter is invaild, please try again"
            });
        }else{
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err || !result){
                    return res.status(401).json({
                        message: "password or email you enter is invaild, please try again"
                    })
                }
                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });

                    return res.status(200).json({
                        message: `user login success`,
                        user: user,
                        token: token
                    })
                }
            })
        }
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.create_user = async (req, res, next) => {
    try{
        const temp = await User.find({email: req.body.email});
        if(temp.length >= 1){
            res.status(409).json({
                message: `email already exist`
            })
        }else{
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    const result = await user.save();
                    res.status(201).json({
                        message: `creating new user ${req.body.email}`,
                        result: result
                    })
                }
            })
        }
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

exports.delete_user = async (req, res, next) => {
    try{
        const result = await User.remove({email: req.params.email})
        res.status(200).json({
            result: result
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}
