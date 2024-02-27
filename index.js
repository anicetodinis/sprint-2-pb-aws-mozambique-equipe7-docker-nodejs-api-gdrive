const stream = require("stream");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});


app.listen(5050, () => {
    console.log('Form running on port 5050');
});