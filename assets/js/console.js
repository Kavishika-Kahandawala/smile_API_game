// Init Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvJpEwhzif7fMxfYyrf7P74davi3GbE8c",
  authDomain: "smile-api-project.firebaseapp.com",
  projectId: "smile-api-project",
  storageBucket: "smile-api-project.appspot.com",
  messagingSenderId: "533428710125",
  appId: "1:533428710125:web:1b0250c9eab62ca8b07ae4",
  measurementId: "G-TC6YH6J52S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Ref msg collection
var messagesRef = firebase.database().ref('messages');

// Listner for submit
document.getElementById('reg_form').addEventListener('submit',submitForm);

function submitForm(e){
    e.preventDefault();
    // console.log(test form)

    // Take Values
    var username=getInputVal('username');
    var password=getInputVal('password');

    // Save message
    saveMessage(username,password)

    // console.log(username+password);
}

// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;

}

//save msg to firebase
function saveMessage(username,password){
    var newMessageRef=messagesRef.push();
    newMessageRef.set({
        username:username,
        password:password
    });
}