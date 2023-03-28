const con = require('../db/db-connector')

// Register api
const regUser = (req, res) => {
  
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var region = req.body.region;
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connection has been established with database");
    var sql =
      "INSERT INTO users ( username, email, password, region) VALUES ( '" +
      username +
      "','" +
      email +
      "','" +
      password +
      "','" +
      region +
      "');";
    // "INSERT INTO users ( username, email, password, region) VALUES ( "+username+","+ email+","+ password+","+region+");";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("User has been registered to the server");
    });
  });

  return res.status(200).json({ success: true});
};

module.exports = regUser;
