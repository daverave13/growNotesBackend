const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const conDev = require("../../public/connections/dev");

const connection = mysql.createConnection(conDev);

// Gets all plants
router.get("/", (req, res) => {
    const sql = `SELECT * FROM plants where idusers = 8;`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get a single plant
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM plants where idplants = ?;`;
    connection.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Create a new plant
router.post("/", (req, res) => {
    const { name, type, status, idusers, date_planted } = req.body;
    console.log(date_planted);
    if (!(name && type && status && idusers))
        res.status(400).json({
            err: `Missing info from request, should contain name, type, status, idusers`
        });
    else {
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const sql = `INSERT INTO plants VALUES (NULL, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL );`;
        connection.query(sql, [name, type, status, idusers, new Date(date_planted).toISOString().slice(0, 19).replace('T', ' ')], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    }
});

// Update plant
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const body = {
        name: req.body.name,
        type: req.body.type,
        status: req.body.status
    };

    let sql = "UPDATE plants SET ";
    for (key in body) if (body[key]) sql += `${key} = "${body[key]}", `;
    sql = sql.slice(0, sql.length - 2);
    sql += ` WHERE idplants = $?;`;

    connection.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Delete a plant
router.delete("/:id", (req, res) => {
    const sql = `DELETE FROM plants WHERE idplants = ?;`;
    connection.query(sql, [req.params.id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;
