
var final_user_health = 5;
var lost_user_health = 0;

var final_enemy_health = 6;
var lost_enemy_health = 0;

var time_seconds = 0;
var mode_lvl = "mode";
var user_lvl=0

const leveltable=()=>{
  
}
const load_smile = async (mode) => {
  setMode(mode);
  console.log(mode);
  const url = "/game/ingame/getQuestion/" + mode;

  const res = await fetch(url);
  const reply = await res.text();
  const obj = JSON.parse(reply);

  // var countdown = 0;
  // clearInterval(countDown);

  console.log(countdown)
  
  document.getElementById("smile_q").src = obj.question;
    run_countdown(obj.time);
  
};
const activate = async (id) => {
  const url = "/game/ingame/startGame/";

  const res = await fetch(url);
  const reply = await res.text();
  const obj = JSON.parse(reply);

  switch (calSes.result) {
    case "plus":

      break;
    case "minus":
      
      break;
    default:
      res.status(201).json({ ans: "404" });
  }
  
};

const load_level = async () => {
  const url = "/game/ingame/startGame/";

  const res = await fetch(url);
  const reply = await res.text();
  const obj = JSON.parse(reply);

  var u_level = obj.level;
  console.log(obj);
  defineLevel(u_level);
  // document.getElementById("level_table").innerHTML =
  //   "<tr id='tr_level_table'><td>dddd</td></tr>".repeat(
  //     obj.level
  //   );
};

const defineLevel = (level) => {
  user_lvl = level;
};

const levelpick=(lvl)=>{
  if (user_lvl<lvl){
    alert("Select Level You completed or lower level than that")
  }else{
    levelPicked(lvl);
  }
}

const levelPicked = async (lvl) => {
  const url = "/game/ingame/pickLevel/"+lvl;

  const res = await fetch(url);
  const reply = await res.text();
  const obj = JSON.parse(reply);

  var u_level = obj.level;
  console.log(obj);
  defineLevel(u_level);
  // document.getElementById("level_table").innerHTML =
  //   "<tr id='tr_level_table'><td>dddd</td></tr>".repeat(
  //     obj.level
  //   );
};


load_level();


var mode = "";
const setMode=(val)=>{
  mode=val
}

function set_smile_q(data) {
  final_question = data;
}
function set_smile_a(data) {
  final_solution = data;
  // to test game
  console.log("ans: " + final_solution);
}
function alert_x() {
  alert(final_solution);
}

// Testing func load
// function load_game() {
//   let pause_div = document.getElementById("pause_menu");
//   let mode_h_menu = document.getElementById("mode_h_menu");
//   let result_area = document.getElementById("result_area");
//   hide_div(pause_div);
//   hide_div(mode_h_menu);
//   hide_div(result_area);
// }
function load_game() {
   
  let level_div = document.getElementById("level_area");
  let mode_h_menu = document.getElementById("mode_h_menu");
  let char_div = document.getElementById("character_area");
  let pause_div = document.getElementById("pause_menu");
  let game_div = document.getElementById("game_area");
  let result_area = document.getElementById("result_area");
  hide_div(char_div); //ddddd
  hide_div(level_div); //ddddd 
  // hide_div(mode_h_menu); //ddddd 
  hide_div(pause_div);
  hide_div(game_div);
  hide_div(result_area);
}

// section hide toggle
function hide_div(id) {
  id.style.display = "none";
}
function show_div(id) {
  id.style.display = "block";
}

function show_toggle(id1, id2) {
  toggle_hider(id1);
  toggle_hider(id2);
}

function toggle_hider(id) {
  var check_id = document.getElementById(id);
  if (check_id.style.display === "none") {
    show_div(check_id);
  } else {
    hide_div(check_id);
  }
}

function reduce_test() {
  var bar = document.getElementById("p1");
  i = 50;
  bar.style.width = i + "%";
}

function mode_after_game(id1, id2, mode) {
  show_toggle(id1, id2);
  set_mode(mode);
  load_smile(mode);
}

function reduce_test() {
  var bar = document.getElementById("p1");
  i = 50;
  bar.style.width = i + "%";
}
function rep_prog() {}

function makeProgress2() {
  var bar = document.getElementById("p1");
  var i = 0;
  do {
    i = i + 1;
    bar.style.width = i + "%";
    bar.innerText = i + "%";
  } while (i < 100);
  // bar.style.width = i + "%";
  // bar.innerText = i + "%";
  // Wait for sometime before running this script again
}

// Coutdown
var countdown = 0;
const testtime = (time) => {
  clearInterval(countDown);
  run_countdown(time);
};

function run_countdown(time) {
  let timeSecond = time;

  displayTime(timeSecond);

  countDown = setInterval(() => {
    timeSecond--;
    time_seconds = timeSecond;
    displayTime(timeSecond);
    if (timeSecond == 0 || timeSecond < 1) {
      endCount();
      clearInterval(countDown);
    }
    if (timeSecond == 5 || timeSecond < 5) {
      document.getElementById("countdown_num").style.color = "red";
    }
  }, 1000);
}

function displayTime(second) {
  var timeH = document.getElementById("countdown_num");
  var min = Math.floor(second / 60);
  var sec = Math.floor(second % 60);
  timeH.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
}

function endCount() {
  document.getElementById("countdown_num").innerHTML = "Time out";
  time_s_up();
}


// Get user answer
const getuser_answer = async (answer) => {
  const url = "/game/ingame/checkAnswer/" + answer;
  console.log(url);
  const res = await fetch(url);
  const reply = await res.text();
  const obj = JSON.parse(reply);

  if ((await obj.ans) == "correct") {
    nextQuestion();
  } else {
    lostQuestion();
  }

  console.log(obj.response);
  // qResult(obj.response);
};

const nextQuestion = () => {
  clearInterval(countDown);
  console.log("next q");
  load_smile(mode);
};
const lostQuestion = () => {
  console.log("incorrect");
};

function getuser_answder(answer) {
  var user_answer = answer;
  // document.getElementById("result").innerHTML = user_answer;
  // alert("answer is "+user_answer);
  if (user_answer == final_solution) {
    reduce_enemy_health();
  } else {
    reduce_user_health();
  }
}

function set_mode(mode) {
  document.getElementById("mode_name").innerHTML = mode;
  mode_lvl = mode;
  switch (mode) {
    case "Beginner":
      document.getElementById("mode_name").style.color = "blue";
      break;
    case "Easy":
      document.getElementById("mode_name").style.color = "blue";
      break;
    case "Medium":
      document.getElementById("mode_name").style.color = "blue";
      break;
    case "Hard":
      document.getElementById("mode_name").style.color = "blue";
      break;
    case "Veteran":
      document.getElementById("mode_name").style.color = "blue";
      break;

    default:
      document.getElementById("mode_name").style.color = "blue";
  }
  // set_countdown(mode);
}

function next_q_load() {
  load_smile();
}

// Levels

var final_level = set_level(5);

function set_level(level) {
  var u_level = level;
  document.getElementById("level_num").innerHTML = level;
  return u_level;
}

// Health
// Health-User
assign_health_bar("4", "5");
function assign_health_bar(uLvl, eLvl) {
  assign_user_health(uLvl);
  assign_enemy_health(eLvl);
}

function assign_user_health(level) {
  var health = 0;
  switch (level) {
    case "1":
      health = 2;
      break;
    case "2":
      health = 3;
      break;
    case "3":
      health = 4;
      break;
    case "4":
      health = 5;
      break;
    case "5":
      health = 6;
      break;
  }
  proto_health(health, "user");
  final_user_health = health;
}

function proto_health(num, side) {
  var health = "<td class='health_have border border-dark'></td>".repeat(num);
  if (side == "user") {
    document.getElementById("user_health_bar").innerHTML = health;
  } else if (side == "enemy") {
    document.getElementById("enemy_health_bar").innerHTML = health;
  }
}

// var final_user_health = 1
// var lost_user_health = 0

// var final_enemy_health = 1
// var lost_enemy_health = 0
function reduce_user_health() {
  lost_user_health += 1;
  if (
    lost_user_health == final_user_health ||
    lost_user_health > final_user_health
  ) {
    document.getElementById("user_health_bar").innerHTML =
      "<td class='health_lost border border-dark'></td>".repeat(
        final_user_health
      );
    user_lose();
  } else {
    let have_health = "<td class='health_have border border-dark'></td>".repeat(
      final_user_health - lost_user_health
    );
    let lost_health = "<td class='health_lost border border-dark'></td>".repeat(
      lost_user_health
    );
    document.getElementById("user_health_bar").innerHTML =
      have_health + lost_health;
  }
}

function reduce_enemy_health() {
  lost_enemy_health += 1;
  if (
    lost_enemy_health == final_enemy_health ||
    lost_enemy_health > final_enemy_health
  ) {
    document.getElementById("enemy_health_bar").innerHTML =
      "<td class='health_lost border border-dark'></td>".repeat(
        final_enemy_health
      );
    next_stage();
  } else {
    let have_health = "<td class='health_have border border-dark'></td>".repeat(
      final_enemy_health - lost_enemy_health
    );
    let lost_health = "<td class='health_lost border border-dark'></td>".repeat(
      lost_enemy_health
    );
    document.getElementById("enemy_health_bar").innerHTML =
      have_health + lost_health;
    user_win();
    inc_char_val();
    score_calc();
  }
}

// Health enemy
function assign_enemy_health(level) {
  var health = 0;
  switch (level) {
    case "1":
      health = 2;
      break;
    case "2":
      health = 3;
      break;
    case "3":
      health = 4;
      break;
    case "4":
      health = 5;
      break;
    case "5":
      health = 6;
      break;
  }
  proto_health(health, "enemy");
  final_enemy_health = health;
}

function user_lose() {
  show_toggle("game_area", "result_area");
  document.getElementById("result_img").src =
    "assets/game files/images/game_over-tactics.png";
}

function user_win() {
  document.getElementById("smile_q").src =
    "assets/game files/images/player_won.png";
  let next_smile = setTimeout(() => {
    load_smile();
  }, 500);
}

function next_stage() {
  show_toggle("game_area", "result_area");
  document.getElementById("result_img").src =
    "assets/game files/images/stage_completed.png";

  // document.getElementById("result_span").textContent = "Next Stage"
}

function time_s_up() {
  show_toggle("game_area", "result_area");
  document.getElementById("result_img").src =
    "assets/game files/images/times_up.png";
}

// Extra (experimental)
function calc_atks() {}

function calc_teamhealth() {}

var sadga = (function (x) {
  return x;
})();
// alert(level_sync)

// character buffs

function inc_char_val() {
  var cd_char1 = document.getElementById("cd_char_1").innerText;
  var cd_char2 = document.getElementById("cd_char_2").innerText;
  var cd_char3 = document.getElementById("cd_char_3").innerText;
  var cd_char4 = document.getElementById("cd_char_4").innerText;

  var av_char1 = document.getElementById("av_char_1").innerText;
  var av_char2 = document.getElementById("av_char_2").innerText;
  var av_char3 = document.getElementById("av_char_3").innerText;
  var av_char4 = document.getElementById("av_char_4").innerText;

  var cd_Arr = [cd_char1, cd_char2, cd_char3, cd_char4];
  var av_Arr = [av_char1, av_char2, av_char3, av_char4];
  var id_Arr = ["cd_char_1", "cd_char_2", "cd_char_3", "cd_char_4"];
  var LenArray = cd_Arr.length;
  for (var i = 0; i < LenArray; i++) {
    let id = id_Arr[i];
    let cd = parseInt(cd_Arr[i]);
    let av = av_Arr[i];
    func_cd_characters(id, cd, av);
  }
}

function func_cd_characters(id, cd, av) {
  if (cd == av) {
    // Do nothing
  } else {
    document.getElementById(id).innerHTML = cd + 1;
  }
}

// Score Calc
function score_calc() {
  var time = 0;

  switch (mode_lvl) {
    case "Beginner":
      time = 500;
      break;
    case "Easy":
      time = 300;
      break;
    case "Medium":
      time = 200;
      break;
    case "Hard":
      time = 60;
      break;
    case "Veteran":
      time = 20;
      break;
    default:
      time = 34;
  }
  var score = parseInt(100 + (time - time_seconds));
  set_score(score);
}
function set_score(score) {
  var prev_score = document.getElementById("score_num").innerText;
  document.getElementById("score_num").innerHTML = parseInt(prev_score) + score;
}

// Execute
load_game();
// load_smile();
