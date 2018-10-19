const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { authenticate } = require("./middlewares");
const db = require("../database/dbConfig.js");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

//get JWT secret key
const secret = require("../_secrets/keys").jwtKey;

function register(req, res) {
  // implement user registration
  const user = req.body;

  if (!user.username || !user.password) {
    res.status(400).json({ error: "Bad request" });
  }
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db("users")
    .insert(user)
    .then(idObj => {
      const id = idObj[0];
      db("users")
        .where({ id: id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ username: user.username, token });
        })
        .catch(err =>
          res
            .status(500)
            .json({ error: "There was an error registering the user" })
        );
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error registering the user" })
    );
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  if (!creds.username || !creds.password) {
    res.status(400).json({ error: "Bad request" });
  }

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ username: user.username, token });
      } else res.status(500).json(err);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error logging in" });
    });
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

function generateToken(user) {
  const payload = {
    ...user
  };

  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
}
