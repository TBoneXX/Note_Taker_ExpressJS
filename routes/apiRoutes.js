const router =  require('express').Router();


//API Routes
router.get('/api/notes', (req, res) => {
    res.json(notes.slice(1));
});

router.post('api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    fs.writeFile('./db/db.json', (newNote), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("Note Recorded Successfully")
        }
    });
    res.json(notes);

})
