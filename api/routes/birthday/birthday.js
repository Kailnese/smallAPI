const express = require("express");
const birthdayController = require("../../controller/birthday/birthday");

const router = express.Router();

router.get("/", birthdayController.get_birthday_cards);
router.post("/", birthdayController.create_birthday_cards);
router.delete("/:id", birthdayController.delete_birthday_cards);
router.delete("/", birthdayController.delete_all);

module.exports = router;