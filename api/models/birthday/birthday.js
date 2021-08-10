const mongoose = require("mongoose");

const birthday = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName: { type: String, required: "firstName is required"},
    lastName: { type: String, required: "lastName is required"},
    birthday: { type: Date, required: "birthday is required"}
})

module.exports = mongoose.model("Birthday", birthday);