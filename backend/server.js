const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sinaali123.",
    database: "todoapp"
})

app.get('/', (req, res) => {
    const sqlQuery = "SELECT * FROM TASKS";

    db.query(sqlQuery, (err, data) => {
        if (err) {
            res.json("Error with database");
        }

        res.json(data);

    })
})

app.post('/', (req, res) => {
    db.query('INSERT INTO TASKS (TASK) VALUES (?)', [req.body.Task], (err, data) => {
        if (err) {
            res.json(err);
        } 
        res.json(data);
    })
})

app.delete('/:ID', (req, res) => {
    db.query("DELETE FROM TASKS WHERE ID = ?", [req.params.ID], (err, data) => {
        if (err) {
            return res.json("Error deleting from database");
        }
        return res.json(data);
    });
});


app.listen(8086, () => {
    console.log("Hello from backend!");
})