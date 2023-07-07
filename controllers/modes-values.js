const levelsVal = {
  levels: [
    { time: 300, score: 100 },
    { time: 240, score: 200 },
    { time: 120, score: 300 },
    { time: 60, score: 400 },
    { time: 20, score: 500 },
  ],
};

// Return Time
const returnTime = (mode) => {
  var time = levelsVal.levels[0].time;
  switch (mode) {
    case "Beginner":
      time = levelsVal.levels[0].time;
      break;
    case "Easy":
      time = levelsVal.levels[1].time;
      break;
    case "Medium":
      time = levelsVal.levels[2].time;
      break;
    case "Hard":
      time = levelsVal.levels[3].time;
      break;
    case "Veteran":
      time = levelsVal.levels[4].time;
      break;
    default:
      time = levelsVal.levels[0].time;
  }
  return time;
};

// Return Score
const returnScore = (mode) => {
  var score = levelsVal.levels[0].score;
  switch (mode) {
    case "Beginner":
      score = levelsVal.levels[0].score;
      break;
    case "Easy":
      score = levelsVal.levels[1].score;
      break;
    case "Medium":
      score = levelsVal.levels[2].score;
      break;
    case "Hard":
      score = levelsVal.levels[3].score;
      break;
    case "Veteran":
      score = levelsVal.levels[4].score;
      break;
    default:
      score = levelsVal.levels[0].score;
  }
  return score;
}

module.exports = { returnTime, returnScore };
