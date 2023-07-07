const mysql = require("mysql");
const moment = require("moment");
const db = require("../db/dbServer");

//Save Answer
let addNewtData = (
  username,
  mode,
  init_characters,
  u_health,
  en_health,
  level
) => {
  const ans = 0;
  const cooldowns = 0;
  const score = 0;
  const ds = "";

  let query = `INSERT INTO game_session 
        (username, ans, time, mode, cooldowns, init_characters, score, u_health, en_health, level ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  // Value to be inserted
  var timeMoment = moment().subtract(1, "days").format("YYYY-MM-DD h:mm:ss");

  // Creating queries
  db.query(
    query,
    [
      username,
      ans,
      timeMoment,
      mode,
      cooldowns,
      init_characters,
      score,
      u_health,
      en_health,
      level,
    ],
    (err, rows) => {
      if (err) throw err;
      console.log("Session saved in: " + rows.insertId);
    }
  );
};

//Delete Answer
let delANs = (uname) => {
  let query = "DELETE FROM game_session WHERE username = ?";

  // Value to be inserted
  let username = "hardUser";

  // Creating queries
  db.query(query, username, (err, rows) => {
    if (err) throw err;
    console.log("deleted row from = " + rows.affectedRows);
  });
};

// async function getAns(data) {
//   var sql = "SELECT ans FROM temp_uval WHERE username = ?";
//   const results = await db.promise().query(sql);
//   console.log(results);
// }

//Get User Answer
const getAns = (uname) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT ans FROM game_session WHERE username = ? AND id=(SELECT max(id) FROM game_session); ";

    // Value to be inserted
    const username = "hardUser";

    // Creating queries
    db.query(query, username, (err, rows) => {
      if (err) throw err;

      return resolve(rows[0].ans);
    });
  });
};

//Get User Time
const getTime = (uname, username) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT time FROM game_session WHERE username = ? AND id=(SELECT max(id) FROM game_session); ";

    // Creating queries
    db.query(query, username, (err, rows) => {
      if (err) throw err;
      return resolve(rows[0].time);
    });
  });
};

//increment cooldown to session
const increCD = (cdJson, username) => {
  // const cdJson
  const string_Json = JSON.stringify(cdJson);

  console.log("cdJson");
  console.log(cdJson);

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlUpdate = `UPDATE game_session SET  init_characters = ? WHERE  username= ? ;`;
    const update_query = mysql.format(sqlUpdate, [string_Json, username]);
    await connection.query(update_query, async (err, Result) => {
      if (err) throw err;
      console.log("--------> (Cooldown Data modified (increment))");
    });
  });
};

//Save smile answer to session
const SaveAns = (Ans, username, timeNow) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlUpdate = `UPDATE game_session SET  ans = ?, time = ? WHERE  username= ? ;`;
    const update_query = mysql.format(sqlUpdate, [Ans, timeNow, username]);
    await connection.query(update_query, async (err, Result) => {
      if (err) throw err;
      console.log("--------> (Answer modified)");
    });
  });
};
//Change enemy health to session
const changeEnHealth = (health, username) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlUpdate = `UPDATE game_session SET  en_health = ? WHERE  username= ? ;`;
    const update_query = mysql.format(sqlUpdate, [health, username]);
    await connection.query(update_query, async (err, Result) => {
      if (err) throw err;
      console.log("--------> (Enemy health reduced)");
    });
  });
};

//Change user health to session
const changeUHealth = (health, username) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlUpdate = `UPDATE game_session SET  u_health = ? WHERE  username= ? ;`;
    const update_query = mysql.format(sqlUpdate, [health, username]);
    await connection.query(update_query, async (err, Result) => {
      if (err) throw err;
      console.log("--------> (User health reduced)");
    });
  });
};
//Change Score
const changeScore = (score, username) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlUpdate = `UPDATE game_session SET  score = ? WHERE  username= ? ;`;
    const update_query = mysql.format(sqlUpdate, [score, username]);
    await connection.query(update_query, async (err, Result) => {
      if (err) throw err;
      console.log("--------> (User health reduced)");
    });
  });
};

//Insert score to Leaderboard
const insLeader = async (username, score, level) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM leaderboard WHERE player_name = ?";
    const search_query = mysql.format(sqlSearch, [username]);
    // const sqlUpdate = `UPDATE game_session SET  cooldowns = ?, score = ? , u_health = ? en_health = ?  WHERE username= ? ;`;

    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("Search Results - Leaderboard");
      console.log(result.length);

      if (result.length != 0) {
        const res_id = result[0].id;
        const res_score = result[0].score;
        const date = moment().subtract(1, "days").format("YYYY-MM-DD");
        const time = moment().subtract(1, "days").format("h:mm:ss");

        if (res_score < score) {
          if (err) throw err;
          const sqlUpdate = `UPDATE leaderboard SET  level= ?, date= ?, time= ?, score = ? WHERE  id= ? ;`;
          const update_query = mysql.format(sqlUpdate, [
            level,
            date,
            time,
            score,
            res_id,
          ]);
          console.log(update_query);
          await connection.query(update_query, async (err, Result) => {
            if (err) throw err;
            console.log("Modiefied in leaderboard");
          });
        }
      } else {
        if (err) throw err;
        console.log("(Something went wrong)");
        // res.json({ response: "500" });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
};
//Ability activate to Leaderboard
const actAbility = async (username,id) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch =
      "SELECT u_health,en_health FROM game_session WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [username]);
    // const sqlUpdate = `UPDATE game_session SET  cooldowns = ?, score = ? , u_health = ? en_health = ?  WHERE username= ? ;`;

    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("Search Results - Leaderboard");
      console.log(result.length);

      if (result.length != 0) {
        const res_id = result[0].id;
        const res_score = result[0].score;
        const date = moment().subtract(1, "days").format("YYYY-MM-DD");
        const time = moment().subtract(1, "days").format("h:mm:ss");

        if (res_score < score) {
          if (err) throw err;
          const sqlUpdate = `UPDATE leaderboard SET  level= ?, date= ?, time= ?, score = ? WHERE  id= ? ;`;
          const update_query = mysql.format(sqlUpdate, [
            level,
            date,
            time,
            score,
            res_id,
          ]);
          console.log(update_query);
          await connection.query(update_query, async (err, Result) => {
            if (err) throw err;
            console.log("Modiefied in leaderboard");
          });
        }
      } else {
        if (err) throw err;
        console.log("(Something went wrong)");
        // res.json({ response: "500" });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
};


module.exports = {
  addNewtData,
  delANs,
  getAns,
  getTime,
  increCD,
  SaveAns,
  changeEnHealth,
  changeUHealth,
  changeScore,
  insLeader,
};
