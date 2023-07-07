const moment = require("moment");
const { smileUrl } = require("./smile_url");
const smileJson = smileUrl;
const {
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
} = require("./ingame_usql-con");
const { returnTime, returnScore } = require("./modes-values");
const mysql = require("mysql");
const db = require("../db/dbServer");

var final_question = "API not loaded";
var final_solution = 0;

// Temp hard codes
const username = "hardUser";

const getQuestion = (req, res) => {
  const { mode } = req.params;
  const time = getTimeMode(mode);
  getText(smileJson);
  async function getText(file) {
    var x = await fetch(file);
    var y = await x.text();
    var obj = JSON.parse(y);

    var smile_question = obj.question;
    var smile_solution = obj.solution;

    var timeNow = moment().subtract(1, "days").format("YYYY-MM-DD h:mm:ss");
    SaveAns(obj.solution, username, timeNow);

    // addNewtData(username);
    // getData();
    console.log("Smile ans: " + smile_solution);
    res.json({ question: smile_question, time: time });
  }
};

const getTimeMode = (mode) => {
  const time = returnTime(mode);
  return time;
};

//Declare question and answer
const set_smile_q = (data) => {
  final_question = data;
};
const set_smile_a = (data) => {
  final_solution = data;
};

//check Time
const checkTime = async (req, res) => {
  //You should probably try/catch it
  try {
    const ans = await getTime();
  } catch (err) {
    console.log(err);
  }
  console.log;
  const { userAns } = req.params;
  if ((await ans) == userAns) {
    console.log(userAns + " " + ans);
    res.json({ response: "correct" });
  } else {
    res.json({ response: "incorrect" });
  }
};

const checkAns = async (req, res) => {
  const { userAns } = req.params;

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM game_session WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [username]);
    // const sqlUpdate = `UPDATE game_session SET  cooldowns = ?, score = ? , u_health = ? en_health = ?  WHERE username= ? ;`;

    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Session Search Results");
      console.log(result.length);

      if (result.length != 0) {
        connection.release();
        console.log("------> Session already exists");
        const res_id = result[0].id;
        const res_ans = result[0].ans;
        const res_time = result[0].time;
        const res_mode = result[0].mode;
        // const res_cooldowns = result[0].cooldowns;
        // const res_init_characters = result[0].init_characters;
        const tempCD = result[0].init_characters;
        const res_cooldowns = JSON.parse(tempCD);
        // console.log(res_cooldowns);

        const res_score = result[0].score;
        const res_u_health = result[0].u_health;
        const res_en_health = result[0].en_health;
        const res_level = result[0].level;

        // console.log(obj);

        if (res_u_health > 0 && res_en_health>0) {
          const calSes = calSession(
            res_ans,
            userAns,
            res_time,
            res_mode,
            res_cooldowns,
            res_score,
            res_level,
            res_en_health,
            res_u_health
          );

          switch (calSes.result) {
            case "correct":
              const score = calSes.score;
              const cd = calSes.cd;
              const enHealth = calSes.enHealth;
              // tt();
              res.status(201).json({
                ans: "correct",
                cd: cd,
                score: score,
                enHealth: enHealth,
              });

              break;
            case "incorrect":
              res.status(201).json({ ans: "incorrect" });
              break;
            case "times_up":
              res.status(201).json({ ans: "times_up" });
              break;
            case "u_dead":
              const userHealth = calSes.userHealth;
              res.status(201).json({ ans: "User Dead" });
              break;
            case "en_dead":
              insLeader(username, res_score, res_level);
              res.status(201).json({ ans: "en_dead" });
              break;
            default:
              res.status(201).json({ ans: "404" });
          }
        }else{
          res.status(400).json({ ans: "400" });
        }
        

        
        // if (calSes.result == "correct") {
        //   res.status(201).json({ ans: "correct" });
        // } else {
        //   res.status(201).json({ ans: "incorrect" });
        // }

        // const levelWin=()=>{}
        //const levelLose=()=>{}
        //send json res here
        // res.sendStatus(409);
        // const update_query = mysql.format(sqlUpdate, [username]);

        // await connection.query(update_query, (err, result) => {
        //   connection.release();
        //   if (err) throw err;
        //   console.log("--------> (Data modified)");
        // });
      } else {
        // await connection.query(insert_query, (err, result) => {
        //   connection.release();

        if (err) throw err;
        console.log("--------> (Something went wrong)");
        res.json({ response: "something went wrong" });

        // res.sendStatus(201);
        // });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
};

const calSession = (
  res_ans,
  userAns,
  res_time,
  mode,
  res_cooldowns,
  res_score,
  res_level,
  res_en_health,
  res_u_health
) => {
  const modeTime = returnTime(mode);
  const u_timeDiff = timeDiff(res_time);
  console.log("time diff is: " + u_timeDiff);

  //[TODO] change to '<'
  if (u_timeDiff < modeTime) {
    console.log("Time ok");
    if (res_ans == userAns) {
      console.log("Answer correct");
      //answer valid
      const cd = cdChange(res_cooldowns);
      // console.log(cd);
      const score = scoreCal(mode, res_score, res_level);
      console.log("scoreCal: " + score);
      const enHealth = enHealthRed(res_en_health);
      console.log("enHealth: " + enHealth);

      if (enHealth > 0) {
        return { result: "correct", cd: cd, score: score, enHealth: enHealth };
      } else {
        return { result: "en_dead" };
      }
      //Database update code here
      // {
      // session update
      // }
    } else {
      // answer invalid
      console.log("Answer incorrect");
      const userHealth = uHealthRed(res_u_health);
      if (userHealth > 0) {
        return { result: "incorrect", userHealth: userHealth };
      } else {
        //Database update code here
        // {
        // session update
        // }

        return { result: "u_dead", userHealth: userHealth };
      }
    }
  } else {
    //Database update code here
    // {
    // session delete
    // }

    return { result: "times_up" };
  }
};

const timeDiff = (startDate) => {
  const endDate = moment().subtract(1, "days").format("YYYY-MM-DD h:mm:ss");
  const endMom = moment(endDate);
  const secondsDiff = endMom.diff(startDate, "seconds");
  return secondsDiff;
};

// {characters: [
//   { code: "#code", col: "Doe", rem: "fdf" },
//   { firstName: "Anna", lastName: "Smith" },
//   { firstName: "Peter", lastName: "Jones" },
// ];}

const cdChange = (cd) => {
  console.log("obj");
  // console.log(cd);
  //implement new Json
  for (var i = 0; i < 4; i++) {
    console.log("inc");
    if (cd.characters[i].rem < cd.characters[i].col) {
      cd.characters[i].rem = cd.characters[i].rem + 1;
    }
  }
  increCD(cd, username);
  return JSON.stringify(cd);
};

const scoreCal = (mode, res_score, res_level) => {
  const modeScore = returnScore(mode);
  const intScore = parseInt(res_score);

  // Levels
  const bonus = 100 * res_level;
  const current = intScore + modeScore;
  const all = bonus + current;
  changeScore(all, username);
  return all;
};
changeEnHealth;
const enHealthRed = (res_en_health) => {
  const health = (res_en_health -= 1);
  changeEnHealth(health, username);
  return health;
};
const uHealthRed = (res_u_health) => {
  console.log("res_u_health " + res_u_health);
  const health = (res_u_health -= 1);
  changeUHealth(health, username);
  return health;
};

//init session
const initSession = async (req, res) => {
  const { userLevel } = req.params;

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    //Get last level
    const sqlLevelSearch =
      "SELECT last_level FROM user_level WHERE username = ?";
    const levelSearch_query = mysql.format(sqlLevelSearch, [username]);
    const initChar =
      '{characters: [{ code: "", col: "", rem: "" },{ code: "", col: "", rem: "" },{ code: "", col: "", rem: "" },{ code: "", col: "", rem: "" },]}';
    const sqlLevelInsert =
      "INSERT INTO game_session (username, level, init_characters ) VALUES (?, ?,?)";
    const insertLevel_query = mysql.format(sqlLevelInsert, [
      username,
      userLevel,
      initChar,
    ]);
    await connection.query(levelSearch_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      // connection.release();

      if (result.length != 0) {
        if (result[0].last_level >= userLevel) {
          console.log("------> User Found in user-level table");
          await connection.query(insertLevel_query, (err, result) => {
            connection.release();

            if (err) throw err;
            console.log("--------> Created session table row");
            console.log(result.insertId);

            res.status(201).json({ result: "done" });

            // res.sendStatus(201);
          });
        } else {
          res.status(404).json({ result: "404" });
        }
      } else {
        res.status(404).json({ result: "404" });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
};

//Entrance to game
const enterGame = async (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    //Get last level
    const sqlLevelSearch =
      "SELECT last_level FROM user_level WHERE username = ?";
    const levelSearch_query = mysql.format(sqlLevelSearch, [username]);

    //Session search
    const sqlSessionSearch =
      "SELECT level FROM game_session WHERE username = '?'";
    const sessionSearch_query = mysql.format(sqlSessionSearch, [username]);

    //Delete session query
    const sqlSessionDelete = "Delete FROM game_session WHERE username = '?'";
    const sessionDelete_query = mysql.format(sqlSessionDelete, [username]);

    //Create level query (if not there)
    const newLevel = "0";
    const sqlLevelCreate =
      "INSERT INTO user_level (username, last_level) VALUES (?, ?)";
    const levelCreate_query = mysql.format(sqlLevelCreate, [
      username,
      newLevel,
    ]);

    //Search Level
    await connection.query(levelSearch_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      // connection.release();

      if (result.length != 0) {
        const last_uLevel = result[0].last_level;
        res.status(201).json({ level: last_uLevel });
        console.log("last level is: " + last_uLevel);
      } else {
        await connection.query(levelCreate_query, async (err, result) => {
          if (err) throw err;
          console.log("Created row in userLevel");
        });
        res.status(201).json({ level: newLevel });
        console.log("------> Search Results");
      }
    }); //end of connection.query()

    //Check previous session data available (If available delete it)
    await connection.query(sqlSessionSearch, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      if (result.length != 0) {
        {
          console.log("------> User Found in user-level table");
          await connection.query(sessionDelete_query, (err, result) => {
            if (err) throw err;
            console.log("--------> Deleted session table row");
            console.log(result.insertId);
          });
        }
      }
    });
    connection.release();
  }); //end of db.getConnection()
};

//Get user's available characters
const getUserCharacters = async (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    //Get User Characters
    const sqlCharSearch =
      "SELECT char_ids FROM user_characters WHERE username = ?";
    const charSearch_query = mysql.format(sqlCharSearch, [username]);

    //Create character query (if not there)
    const sqlCharCreate =
      "INSERT INTO user_characters (username, char_ids) VALUES (?, ?)";
    const charCreate_query = mysql.format(sqlCharCreate, [username, ""]);

    //Search user characters
    await connection.query(charSearch_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);

      if (result.length != 0) {
        const characterIDs = JSON.parse(result[0].char_ids);
        res.status(201).json({ characters: characterIDs });
        // console.log("Available characters are : " + characters);
        // var hello = "dd";
        // for (let i = 1; i < characters.length; i++) {
        //   hello = hello + characters[i];
        // }
        // console.log(hello);
      } else {
        await connection.query(charCreate_query, async (err, result) => {
          if (err) throw err;
          console.log("Created row in userLevel");
        });
        res.status(201).json({ characters: "0" });
        console.log("------> Search Results");
      }
    }); //end of connection.query()
    connection.release();
  }); //end of db.getConnection()
};

//Get character details (id,name.img)
const getCharDetails = async (req, res) => {
  const { charID } = req.params;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    //Get User Characters
    const sqlCharSearch =
      "SELECT id,name,char_img FROM characters WHERE id = ?";
    const charSearch_query = mysql.format(sqlCharSearch, [charID]);

    //Search user characters
    await connection.query(charSearch_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      // connection.release();

      if (result.length != 0) {
        const id = result[0].id;
        const name = result[0].name;
        const img = result[0].char_img;

        //Create id array
        const characterIDs = "[" + id + "," + name + "," + img + "]";
        res.status(201).json({ characters: characterIDs });
        connection.release();
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
};

const insCharacterSession = async (req, res) => {
  const { charID } = req.params;
  const charArray = JSON.parse(charID);
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    //Get User Characters
    const sqlCharSearch = "SELECT * FROM user_characters WHERE username = ?";
    const charSearch_query = mysql.format(sqlCharSearch, [username]);
    const sqlSessCharSearch =
      "SELECT init_characters FROM game_session WHERE username = ?";
    const charSessSearch_query = mysql.format(sqlSessCharSearch, [username]);

    //Create character query (if not there)
    const sqlSessionCharUpdate =
      "UPDATE game_session SET init_characters = ? WHERE username = ?";

    //Search user characters
    await connection.query(charSearch_query, async (err, result1) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result1.length);

      if (result1.length != 0) {
        const inputCharIDs = JSON.parse(result1[0].char_ids);

        var objHandler = "";

        for (let i = 0; i < charArray.length; i++) {
          // console.log("done");

          for (let j = 0; j < inputCharIDs.length; j++) {
            if (charArray[i] == inputCharIDs[j]) {
              //Search user characters
              await connection.query(
                charSessSearch_query,
                async (err, result2) => {
                  if (err) throw err;
                  console.log("------> Search Results");
                  console.log(result2.length);
                  var tt = result2[0].init_characters;
                  var obj = JSON.parse(tt);
                  objHandler = obj;

                  if (result2.length != 0) {
                    //Get cooldown of character
                    const sqlCDSearch =
                      "SELECT * FROM characters WHERE id = '?'";
                    const charCD_query = mysql.format(sqlCDSearch, [
                      inputCharIDs[j],
                    ]);
                    await connection.query(
                      charCD_query,
                      async (err, result3) => {
                        if (err) throw err;
                        console.log("------> Search Results cooldown and id");
                        console.log(result3.length);
                        console.log(result3);
                        var cdVal = result3[0].cooldown;
                        var Charid = result3[0].id;
                        obj.characters[i].col = cdVal;
                        obj.characters[i].code = Charid;

                        if (result3.length != 0) {
                          var charIns = obj.characters[0].code;

                          console.log("obj handler is");
                          // console.log(objHandler);
                          // obj.characters[i].code = Charid;
                          console.log(sqlSessionCharUpdate);
                          var stringObj = JSON.stringify(objHandler);
                          const SessionCharUpdate_query = mysql.format(
                            sqlSessionCharUpdate,
                            [stringObj, username]
                          );
                          await connection.query(
                            SessionCharUpdate_query,
                            async (err, result4) => {
                              if (err) throw err;
                              console.log("Updated Session Data");
                            }
                          );
                        } else {
                          console.log("ffff");
                        }
                      }
                    );
                  }
                }
              );

              // await connection.query(
              //   charSessSearch_query,
              //   async (err, result) => {
              //     if (err) throw err;
              //     console.log("------> done Results 1");
              //     console.log(result.length);
              //     var tt = result[0].init_characters;
              //     // const myJSON = JSON.stringify(tt);
              //     const obj = JSON.parse(tt);
              //     console.log(obj.characters[0].code);
              //   }
              // );
            }
          }
          // hello = hello + characters[i];

          // await connection.query(charSearch_query, async (err, result) => {
          //   if (err) throw err;
          //   console.log("------> Search Results");
          //   console.log(result.length);

          //   if (result.length != 0) {
          //   }
          // });
        }

        res.status(201).json({ characters: "characterIDs" });
        // console.log("Available characters are : " + characters);
        // var hello = "dd";
        // for (let i = 1; i < characters.length; i++) {
        //   hello = hello + characters[i];
        // }
        // console.log(hello);
      }
      // else {
      //   await connection.query(charCreate_query, async (err, result) => {
      //     if (err) throw err;
      //     console.log("Created row in userLevel");
      //   });
      //   // res.status(201).json({ characters: "0" });
      //   console.log("------> Search Results");
      // }
    }); //end of connection.query()
    connection.release();
  }); //end of db.getConnection()
};

//Select mode at beginning
const modeSelect = (req, res) => {
  const { mode } = req.params;

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlUpdate = `UPDATE game_session SET  mode = ? WHERE  username= ? ;`;
    const update_query = mysql.format(sqlUpdate, [mode, username]);
    await connection.query(update_query, async (err, Result) => {
      if (err) throw err;
      console.log("--------> (Answer modified)");
      res.status(201).json({ result: "true" });
    });
  });
};

// const getLDdata = (req, res) => {
//   const { region } = req.params;
//   const answer=searchLeaderboard(region);
//   var string = JSON.stringify(answer);
//   var json = JSON.parse(answer);
//   console.log(answer);

//   res.status(201).json(string);
// }
const getLDdata = async (req, res) => {
  const { region } = req.params;
  db.getConnection(async (err, connection) => {
    var sqlSearch = "SELECT * FROM leaderboard";
    if (region != 0) {
      sqlSearch =
        "SELECT * FROM leaderboard WHERE region =" + region ;
    }
    if (err) throw err;
    const search_query = mysql.format(sqlSearch);
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("Search Results - Leaderboard");
      console.log(result.length);

      if (result.length != 0) {
        var data = "";
        for (let i = 0; i < result.length; i++) {
          data =
            data +
            "{" +
            '"user":' +
            '"' +
            result[i].player_name +
            '"' +
            "," +
            '"level":' +
            '"' +
            result[i].level +
            '"' +
            "," +
            '"date":' +
            '"' +
            result[i].date +
            '"' +
            "," +
            '"time":' +
            '"' +
            result[i].time +
            '"' +
            "," +
            '"region":' +
            '"' +
            result[i].region +
            '"' +
            "," +
            '"score":' +
            '"' +
            result[i].score +
            '"' +
            "}";
          if (i + 1 < result.length) {
            data = data + ",";
          }
        }
        var final = '{"characters":[' + data + "]}";
        var json = JSON.parse(final);
        var string = JSON.stringify(json);
        // console.log(json);
        res.status(201).json(json.length);
      } else {
        return { response: 'none' };
      }
    });
  });
};
module.exports = {
  getQuestion,
  checkAns,
  initSession,
  enterGame,
  getUserCharacters,
  getCharDetails,
  insCharacterSession,
  modeSelect,
  getLDdata,
};
