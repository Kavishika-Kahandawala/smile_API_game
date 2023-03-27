var quest3 = "ff";
var solution3 = -1;
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
        return {
            'smile_question': smile_question,
            'smile_solution': smile_solution
        };

    }
}
async function getText() {
    var x = await fetch("https://marcconrad.com/uob/smile/api.php?out=json");
    var y = await x.text();


    var obj = JSON.parse(y);

    var smile_question = obj.question;
    var smile_solution = obj.solution;
    // alert(obj.question);
    // alert(smile_question)


    // document.getElementById("demo").innerHTML = y;
    document.getElementById("smile_q").src = smile_question;
    // document.getElementById("demo").innerHTML = y;
    return {
        smile_question: smile_question,
        smile_solution: smile_solution
    }

}
var ssdsd=getText()
var smile_b=ssdsd.smile_solution;
console.log(smile_b)

// sdsds
var student = (function () {
    return {
        getName: function () {
            var name = "Alex";
            return name;
        },

        getAge: function () {
            var age = 35;
            return age;
        }
    };
})();
console.log(student.getName());
console.log(student.getAge());

// var student= (function() {
//     return {
//         getName: function() {
//             var name = "Alex";
//             return name;  
// },

//         getAge: function() {
//            var age= 35;
//            return age;  
// }
//     };  })();  

// console.log(student.getName());
// console.log(student.getAge());

// alert(result.smile_solution);

// var ssdsd=load_smile()
// var smile_b=ssdsd.smile_solution;
// alert(smile_b)
// console.log(smile_values)



function getuser_answer(answer) {
    var user_answer = answer;
    // document.getElementById("result").innerHTML = user_answer;
    // alert("answer is "+user_answer);
    alert("answer is " + smile_result.return_sq);
}

function time_s_up() {
    alert("Your time is over");
}