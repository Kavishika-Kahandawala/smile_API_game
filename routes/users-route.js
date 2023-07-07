const express = require("express");
const router = express.Router();

const { regUser, loginUser } = require("../controllers/con_users");

router.route("/register").post(regUser);
router.route('/login').post(loginUser)
// router.route("/").post(userCtrl);

module.exports = router;
