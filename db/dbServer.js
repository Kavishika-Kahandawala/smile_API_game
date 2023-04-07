const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost", //This is your localhost IP
  user: "root", // "newuser" created in Step 1(e)
  password: "", // password for the new user
  database: "smile_game", // Database name
  //   port: "3306", // port name, "3306" by default
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected successful: " + connection.threadId);
});

module.exports = db;