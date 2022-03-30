const express = require('express');
const app = express()
const categoryRoute = require('./routes/categoryRoute')
const mongoose = require('mongoose')
const path = require('path');
require("dotenv").config();


// app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.use(express.json())

 

app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api', categoryRoute)



const PORT = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database Connected..");
        app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    })
    .catch((err) => console.log(err.message));
