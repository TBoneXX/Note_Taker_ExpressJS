const express = require('express');
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const notes = require('./db/db.json');

const uuid = require('uuid');


//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//STATIC Middleware
app.use(express.static('public'));





app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`)


});