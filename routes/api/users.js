const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const conDev = require("../../public/connections/dev");

const connection = mysql.createConnection(conDev);

// Gets all users
router.get("/", (req, res) => {
    const sql = `SELECT * FROM users;`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get a single member
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM users where idusers = ${id};`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Create a new user
router.post("/", (req, res) => {
    const { userName } = req.body;
    if (!userName)
        res.status(400).json({
            err: `Missing username from request`
        });
    else {
        const sql = `INSERT INTO users VALUES (NULL,"${userName}");`;
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
        userName: req.body.userName,
    };

    let sql = "UPDATE users SET ";
    for (key in body) if (body[key]) sql += `${key} = '${body[key]}', `;
    sql = sql.slice(0, sql.length - 2);
    sql += ` WHERE idusers = '${id}';`;

    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Delete a user
router.delete("/:id", (req, res) => {
    const sql = `DELETE FROM users WHERE idusers = '${req.params.id}';`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;
