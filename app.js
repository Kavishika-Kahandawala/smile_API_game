const express = require('express');
const app = express();


app.use (express.static('./public'))
app.use (express.urlencoded({extended: false}))
// app.use (express.json())

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "smile_game",
});



// Register api
app.post('/register', (req, res) => {
    console.log(req.body.email)
    var username=req.body.username
    var email=req.body.email
    var password=req.body.password
    var region=req.body.region
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connection established with database");
      var sql =
        "INSERT INTO users ( username, email, password, region) VALUES ( '"+username+"','"+email+"','"+password+"','"+region+"');";
        // "INSERT INTO users ( username, email, password, region) VALUES ( "+username+","+ email+","+ password+","+region+");";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });


//   const { name } = req.body
//   if (name) {
//     return res.status(200).send(`Welcome ${name}`)
//   }

//   res.status(401).send('Please Provide Credentials')
})



// init server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
})