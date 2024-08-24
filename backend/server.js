const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


app.listen(8086, () => {
    console.log("Hello from backend!");
})