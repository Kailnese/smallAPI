const express = require("express");

const UserController = require("../../controller/common/user");

const router = express.Router();

router.get("/", UserController.get_users);
router.post("/login", UserController.login);
router.post("/signup", UserController.create_user);
router.delete("/email", UserController.delete_user);

module.exports = router;