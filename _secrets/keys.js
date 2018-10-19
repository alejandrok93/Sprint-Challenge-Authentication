require("dotenv").load();

const key = process.env.JWT_SECRET;

module.exports = {
  jwtKey: key
};
