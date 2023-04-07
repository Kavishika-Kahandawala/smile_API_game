const express = require("express");
const router = express.Router();

const { regUser } = require("../controllers/con_users");

router.route("/register").post(regUser);
// router.route("/").post(userCtrl);

module.exports = router;
