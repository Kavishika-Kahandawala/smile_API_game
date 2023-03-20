// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRPBovPwkfcs2bARMWOE2MPW8NcFczYW0",
  authDomain: "smile-api-project-c6863.firebaseapp.com",
  databaseURL: "https://smile-api-project-c6863-default-rtdb.firebaseio.com",
  projectId: "smile-api-project-c6863",
  storageBucket: "smile-api-project-c6863.appspot.com",
  messagingSenderId: "960501629363",
  appId: "1:960501629363:web:c83df1109c7f1029008bc6",
  measurementId: "G-69X2HKG33H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// const auth = getAuth(app);

window.signup = function (e) {
  e.preventDefault();
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value
  var obj = {
    email: email,
    username: username,
    password: password
  }
  createUserWithEmailAndPassword(auth, obj.email, obj.username, obj.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

}


