const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const mysql = require("mysql");
const conSchema1 = require("../../public/connections/schema1");

const connection = mysql.createConnection(conSchema1);

// Gets all members
router.get("/", (req, res) => {
  const sql = `SELECT * FROM user;`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get a single member
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM user where iduser = ${id};`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Create a new user
router.post("/", (req, res) => {
  const { user_name, email, password } = req.body;
  if (!user_name || !email || !password)
    res.status(400).json({
      err: `Missing ${user_name ? "" : "[user_name] "}${
        email ? "" : "[email] "
      }${password ? "" : "[password] "}from request.`
    });
  else {
    const sql = `INSERT INTO user VALUES (NULL,"${user_name}","${email}","${password}");`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  }
});

// Update user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password
  };

  let sql = "UPDATE user SET ";
  for (key in body) if (body[key]) sql += `${key} = '${body[key]}', `;
  sql = sql.slice(0, sql.length - 2);
  sql += ` WHERE iduser = '${id}';`;

  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Delete a user
router.delete("/:id", (req, res) => {
  const sql = `DELETE FROM user WHERE iduser = '${req.params.id}';`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

module.exports = router;
