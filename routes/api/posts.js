const express = require("express");
const moment = require("moment");
const router = express.Router();
const mysql = require("mysql");
const conDev = require("../../public/connections/dev");

const connection = mysql.createConnection(conDev);

// Gets all posts
router.get("/", (req, res) => {
    const sql = `SELECT * FROM posts;`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get a single post
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM posts where idposts = ?;`;
    connection.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Create a new post
router.post("/", (req, res) => {
    const {
        idplants,
        type,
        idusers,
        height,
        temperature,
        humidity,
        pH,
        water_amount,
        watered,
        fed,
        text
    } = req.body;
    if (!(idplants && type && idusers))
        res.status(400).json({
            err: `Missing info from request, should contain idplants, type, idusers`
        });
    else {
        const now = moment().format();
        console.log(now);
        const sql = 'INSERT INTO posts VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ';
        connection.query(sql, [type, idplants, idusers, height, temperature, humidity, pH, water_amount, text, now, watered ? now : null, fed ? now : null], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    }
});

// Update post
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const body = {
        idplants,
        type,
        idusers,
        height,
        temperature,
        humidity,
        pH,
        water_amount,
        text
    } = req.body;

    let sql = "UPDATE posts SET ";
    for (key in body) if (body[key]) sql += `${key} = "${body[key]}", `;
    sql = sql.slice(0, sql.length - 2);
    sql += ` WHERE idposts = ?;`;
    console.log(sql);

    connection.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Delete a post
router.delete("/:id", (req, res) => {
    const sql = `DELETE FROM posts WHERE idposts = ?;`;
    connection.query(sql, [req.params.id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;
