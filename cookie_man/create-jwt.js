const jwt = require("jsonwebtoken");
const jwt_key = require("../key/jwt-key");

// create json web token
const maxAge = 3 * 24 * 60 * 60; //token live period

const createToken = (id) => {
  return jwt.sign({ id }, jwt_key, {
    expiresIn: maxAge,
  });
};

module.exports = { createToken, maxAge };
