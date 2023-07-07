const express = require("express");
const router = express.Router();

// const { load_smile } = require("../controllers/get_smile-con");
const {
  getQuestion,
  checkAns,
  initSession,
  enterGame,
  getUserCharacters,
  getCharDetails,
  insCharacterSession,
  modeSelect,
  getLDdata,
} = require("../controllers/ingame-con");

//ingame
router.route("/getQuestion/:mode").get(getQuestion);
router.route("/checkAnswer/:userAns").get(checkAns);
router.route("/pickLevel/:userLevel").get(initSession);
router.route("/availChar").get(getUserCharacters);
router.route("/startGame").get(enterGame);
router.route("/getCharacterDet/:charID").get(getCharDetails);
router.route("/SelectCharacters/:charID").get(insCharacterSession);
router.route("/selectMode/:mode").get(modeSelect);
router.route("/getLeaderboard/:region").get(getLDdata);

//validate

module.exports = router;
