const express = require('express');

const checkAuth = require("../../middleware/check_auth");
const OrderController = require("../../controller/commerical/order");

const router = express.Router();

router.get("/", checkAuth, OrderController.get_orders);
router.get("/:orderId", checkAuth, OrderController.get_order);
router.post("/", checkAuth, OrderController.create_order);
router.patch("/:orderId", checkAuth, OrderController.updating_order);
router.delete("/:orderId", checkAuth, OrderController.delete_order);
router.delete("/", checkAuth, OrderController.delete_all_order)

module.exports = router;