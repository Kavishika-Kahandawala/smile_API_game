
var quest = "";
var solution = -1;

let newgame = function(x) {
   
    startup();
}
let handleInput = function(x) {

    let inp = document.getElementById("input");
    var note = document.getElementById("note");
    if (inp.value == solution) {
        note.innerHTML = 'Correct! -  <button class="button-62" onClick="newgame()" >New game?</button>';
    } else {
        note.innerHTML = "Not Correct!";
    }
}


let startQuest = function(data) {
    var parsed = JSON.parse(data);
    quest = parsed.question;
    solution = parsed.solution;
    let img = document.getElementById("smile_q");
    img.src = quest;
    let note = document.getElementById("ttt");
    note.innerHTML = solution;
}

let fetchText = async function() {
    let response = await fetch('https://marcconrad.com/uob/smile/api.php');
    let data = await response.text();
    startQuest(data);
}

let startup = function() {
    fetchText();
}

