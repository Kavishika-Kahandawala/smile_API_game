const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const userRoute = require("./routes/users-route");
const mysql = require("mysql");

const db = require("./db/dbServer");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CREATE USER
app.post("/users/register", async (req, res) => {
  const user = req.body.username;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const region = req.body.region;

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM users WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [user]);
    const sqlInsert =
      "INSERT INTO users ( username, email, password, region) VALUES ( '" +
      user +
      "','" +
      email +
      "','" +
      hashedPassword +
      "','" +
      region +
      "');";
    const insert_query = mysql.format(sqlInsert, [user, hashedPassword]);
    // ? will be replaced by values
    // ?? will be replaced by string
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);

      if (result.length != 0) {
        connection.release();
        console.log("------> User already exists");
        res.sendStatus(409);
      } else {
        await connection.query(insert_query, (err, result) => {
          connection.release();

          if (err) throw err;
          console.log("--------> Created new User");
          console.log(result.insertId);
          res.sendStatus(201);
        });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
}); //end of app.post()


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

//
//
//
//
//LOGIN (AUTHENTICATE USER)
app.post("/users/login", (req, res) => {
  const user1 = req.body.username;
  const password1 = req.body.password;

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "Select * from users where username = ?";
    const search_query = mysql.format(sqlSearch, [user1]);

    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;

      if (result.length == 0) {
        console.log("--------> User does not exist");
        res.sendStatus(404);
      } else {
        const hashedPassword = result[0].password;
        console.log(hashedPassword)
        console.log(password1)
        //get the hashedPassword from result

        var verify =await bcrypt.compare(password1, hashedPassword);
        if (verify) {
          console.log("---------> Login Successful");
          res.send(`${user1} is logged in!`);
        } else {
          console.log("---------> Password Incorrect");
          res.send("Password incorrect!");
        } //end of bcrypt.compare()
      } //end of User exists i.e. results.length==0
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.post()

// init server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
