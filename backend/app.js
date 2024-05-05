const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const {log} = require("console");
const app = express();

require('dotenv').config();

const authRoutes = require('./app/Routes/auth');
const postRoutes = require('./app/Routes/post');
const stackRoutes = require('./app/Routes/stack');

const dbconnection = process.env.DB_CONNECTION;
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;
const dbname = process.env.DB_DATABASE;

mongoose.connect(`${dbconnection}://${dbhost}:${dbport}/${dbname}`)
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((err) => {
        console.log('Connection failed!', err)
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Configuração do CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
});


app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/stack', stackRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.status(404).json({message: "Route" + req.url + " Not found."});
});


module.exports = app;