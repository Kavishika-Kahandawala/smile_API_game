const jwt = require("jsonwebtoken");
const jwt_key = require("../key/jwt-key");
const mysql = require("mysql");
const db = require("../db/dbServer");
const express = require ('express')

const checkAuth = (req, res, next) => {
  const smile_token = req.cookies.smile_token; //Todo check jwt==cookie name

  // check json web token exists & is verified
  if (smile_token) {
    jwt.verify(smile_token, jwt_key, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/signin");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    res.redirect("/signin");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const smile_token = req.cookies.smile_token; //Todo check jwt==cookie name
  if (smile_token) {
    jwt.verify(smile_token, jwt_key, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { checkAuth, checkUser };

// db.getConnection(async (err, connection) => {
//     if (err) throw err;
//     const sqlSearch = "SELECT * FROM users WHERE username = ";
// })