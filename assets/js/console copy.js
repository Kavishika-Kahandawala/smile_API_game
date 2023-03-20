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
  const auth = firebase.auth()
  const database = firebase.database()

  function register(){
    // Get input values
    email=document.getElementById('email').value
    username=document.getElementById('username').value
    password=document.getElementById('password').value
  }

//   validate fields
if (validate_fields==false){
    alert("No empty fields")
}

// Auth
auth.createUserWithEmailAndPassword(email,password)
.then(function(){

    var user=auth.currentUser

    // Connecting firebase db
    var database_ref=database.ref()

    // Create user data
    var user_data={
        email:email,
        username:username,
        last_login:Date.now()
    }
    database_ref.child('users/'+user.uid).set(user_data)

})
.catch(function(error){
    // Firebase Alerts
    var error_code=error.code
    var error_message=error.message

    alert (error_message)
})


  function validate_fields(field){
    if (field==null){
        return false
    }
    if (field.length<=0){
        return false
    } else {
        return true
    }
  }