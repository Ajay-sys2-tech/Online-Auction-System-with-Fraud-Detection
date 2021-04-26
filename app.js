const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const bodyParser=require("body-parser");
const fileUpload = require('express-fileupload');


dotenv.config({ path:'./.env'});

const app = express();
// const request = require('request');

const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const publicdirectory = path.join(__dirname, './public');
app.use(express.static(publicdirectory));

//parse-url-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}));
//parse JSON  bodies (as sent by API clients)

app.use(express.json());


app.set('view engine', 'hbs');




app.use(fileUpload());

db.connect( (error) => {
    if(error){
        console.log(error)
    }else{
        console.log("mysql Connected....")
    }
})

//Define routes

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("server started on port 5000");
})