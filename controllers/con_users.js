const { createToken, maxAge } = require ('../cookie_man/create-jwt')
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const db = require ('../db/dbServer')


//Register a User
const regUser = async (req, res) => {
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
          const token = createToken(user);
          res.cookie("smile_token", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: "strict",
          });
          res.status(201).json({ user });

          // res.sendStatus(201);
        });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
};


//login user
const loginUser = async (req, res) => {
    const logUser = req.body.username;
    const logPassword = req.body.password;

    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = "Select * from users where username = ?";
      const search_query = mysql.format(sqlSearch, [logUser]);

      await connection.query(search_query, async (err, result) => {
        connection.release();

        if (err) throw err;

        if (result.length == 0) {
          console.log("--------> User does not exist");
          res.sendStatus(404);
        } else {
          const hashedPassword = result[0].password;
          console.log(hashedPassword);
          console.log(logPassword);
          //get the hashedPassword from result

          var verify = await bcrypt.compare(logPassword, hashedPassword);
          if (verify) {
            console.log("---------> Login Successful");
            res.send(`${logUser} is logged in!`);
          } else {
            console.log("---------> Password Incorrect");
            res.send("Password incorrect!");
          } //end of bcrypt.compare()
        } //end of User exists i.e. results.length==0
      }); //end of connection.query()
    }); //end of db.connection()
  }; //end of app.post()






module.exports = { regUser, loginUser };
