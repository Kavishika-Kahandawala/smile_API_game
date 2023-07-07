const char1 = { time: 300, sdsd: "dsd" };
const char2 = { time: 240, sdsd: "dsd" };
const char3 = { time: 120, sdsd: "dsd" };
const char4 = { time: 60, sdsd: "dsd" };
const lvl_vet = { time: 20, sdsd: "dsd" };

const returnTime = (mode) => {
  var time = 300;
  switch (mode) {
    case "Beginner":
      time = lvl_begi.time;
      break;
    case "Easy":
      time = lvl_easy.time;
      break;
    case "Medium":
      time = lvl_mid.time;
      break;
    case "Hard":
      time = lvl_hard.time;
      break;
    case "Veteran":
      time = lvl_vet.time;
      break;
    default:
      time = lvl_begi.time;
  }
  return time;
};

module.exports = { returnTime };
