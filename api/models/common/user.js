const mongoose = require("mongoose");

const user = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: "duplicate email", 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: "password cannot be null" }
})

module.exports = mongoose.model("User", user);