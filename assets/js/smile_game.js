var final_question = "API not loaded";
var final_solution = 0;

// Execute
load_game();


function load_smile() {
    // document.getElementsByTagName("body")[0].style.cursor = "url('../game files/cursor/cursor_1.png'), auto";
    // document.body.style.cursor = '../game files/cursor/cursor_1.png';
    // document.getElementsByTagName("body")[0].style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";

    getText("https://marcconrad.com/uob/smile/api.php?out=json");


    async function getText(file) {
        var x = await fetch(file);
        var y = await x.text();


        var obj = JSON.parse(y);

        var smile_question = obj.question;
        var smile_solution = obj.solution;
        // alert(obj.question);


        // document.getElementById("demo").innerHTML = y;
        document.getElementById("smile_q").src = smile_question;
        // document.getElementById("demo").innerHTML = y;
        set_smile_q(smile_question)
        set_smile_a(smile_solution)



    }
}


function set_smile_q(data) {
    final_question = data;
}
function set_smile_a(data) {
    final_solution = data;
}
function alert_x() {
    alert(final_solution)
}

// Manipulate dom with js
function game_area_change() {

    // document.getElementById("game_area").innerHTML = "<img class='smile_q' id='smile_q' src='images/sample.png'>";
}

function load_game(){
    let pause_div=document.getElementById("pause_menu")
    let game_div=document.getElementById("game_area")
    hide_div(pause_div)
    hide_div(game_div)
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
        hide_div(check_id)
    }
}



function reduce_test() {
    var bar = document.getElementById("p1");
    i = 50
    bar.style.width = i + "%";
}

function mode_after_game(id1,id2,mode){
    show_toggle(id1, id2);
    set_mode(mode)
}

// function tt() {
//     var i = 0;
//     var bar = document.getElementById("p1");
//     function makeProgress() {
//         if (i < 100) {
//             i = i + 50;
//             bar.style.width = i + "%";
//             bar.innerText = i + "%";
//         }

//         // Wait for sometime before running this script again
//         setTimeout("makeProgress()", 100);
//     }
//     makeProgress();
// }
// function makes() {
//     var i = 0;
//     var bar = document.getElementById("p1");

//     makeProgress2(bar);
// }
function reduce_test() {
    var bar = document.getElementById("p1");
    i = 50
    bar.style.width = i + "%";
}
function rep_prog() {

}

function makeProgress2() {
    var bar = document.getElementById("p1");
    var i = 0;
    do {
        i = i + 1;
        bar.style.width = i + "%";
        bar.innerText = i + "%";
    }
    while (i < 100);
    // bar.style.width = i + "%";
    // bar.innerText = i + "%";



    // Wait for sometime before running this script again
}



// Coutdown
function set_countdown(mode) {
    var time = 0

    switch (mode) {
        case "Beginner":
            time = 5000000;
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
    run_countdown(time);
}
function run_countdown(time) {


    let timeSecond = time;

    displayTime(timeSecond);

    const countDown = setInterval(() => {
        timeSecond--;
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
    time_s_up()
}
// var student = (function () {
//     return {
//         getName: function () {
//             var name = "Alex";
//             return name;
//         },

//         getAge: function () {
//             var age = 35;
//             return age;
//         }
//     };
// })();
// console.log(student.getName());
// console.log(student.getAge());

// Get user answer
function getuser_answer(answer) {
    var user_answer = answer;
    // document.getElementById("result").innerHTML = user_answer;
    // alert("answer is "+user_answer);
    if (user_answer == final_solution) {
        alert("answer is correct");
    } else {
        alert("wrong!!");
    }
}

function set_mode(mode){
    document.getElementById("mode_name").innerHTML = mode;
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
    set_countdown(mode)

}

function time_s_up() {
    alert("Your time is over");
}

function next_q_load() {
    load_smile();
}

function user_lose() {

}

function user_win() {

}

function enemylose() {

}

function force_user_health() {

}

function force_enemy_health() {

}

function reduce_user_health() {

}

function reduce_enemy_health() {

}

function set_level(level) {
    document.getElementById("level_num").innerHTML = level;
}

function next_enemy() {

}

// Extra (experimental)
function calc_atks() {

}

function calc_teamhealth() {

}
