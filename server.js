const express = require('express');
const app = express();

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

//HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//API Routes
app.get('/api/notes', (req, res) => {
    res.json(notes.slice(1));
});

app.post('api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    fs.writeFileSync('./dp/db.json', JSON.stringify);
    res.json(notes);

})


app.listen(PORT, function () {
    console.log(`App listening on PORT${PORT}`)


});