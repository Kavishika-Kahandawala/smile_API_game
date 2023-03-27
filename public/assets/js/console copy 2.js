// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvJpEwhzif7fMxfYyrf7P74davi3GbE8c",
  authDomain: "smile-api-project.firebaseapp.com",
  databaseURL: "https://smile-api-project-default-rtdb.firebaseio.com",
  projectId: "smile-api-project",
  storageBucket: "smile-api-project.appspot.com",
  messagingSenderId: "533428710125",
  appId: "1:533428710125:web:1b0250c9eab62ca8b07ae4",
  measurementId: "G-TC6YH6J52S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Init variables
const auth = getAuth()


// Get input values

var email = document.getElementById('email').value
var username = document.getElementById('username').value
var password = document.getElementById('password').value

window.signup=function(e){
    e.preventDefault();
    var obj={
        email:email,
        username:username,
        password:password
    }
    createUserWithEmailAndPassword(auth,obj.email,obj.username,obj.password)
    .then(function(success){
        alert("Sign up succes")
    })
    .catch(function(err){
        alert("error"+err)
    })
    console.log(obj)
}


//   validate fields
if (validate_fields == false) {
    alert("No empty fields")
}



function validate_fields(field) {
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}