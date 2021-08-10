const express = require("express");
const mongoose = require("mongoose");

const productRoute = require("./api/routes/commerical/product");
const orderRoute = require('./api/routes/commerical/order');
const birthdayRoute = require("./api/routes/birthday/birthday");
const userRoute = require("./api/routes/common/user");

const app = express();
mongoose.connect(
    `mongodb+srv://kai83019922:${process.env.MONGO_PW}@cluster0.itsc0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
)

app.use('/productImages', express.static('productImages'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "welcome to express world"
    })
});

// dealing with products request
app.use("/products", productRoute);
// dealing with order request
app.use('/orders', orderRoute);
// dealing with birthday request
app.use('/birthday', birthdayRoute);
// dealing with user request
app.use('/user', userRoute);

module.exports = app;
