const fs = require('fs');
const util = require('util');

//Utilize UUID to generate unique id's for each entered note.
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf-8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            //If notes is not an array and can't become one, return empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }  
            
            return parsedNotes;
        })

    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }

      //Call uuid to create unique identifiers for each note stored.
      const newNote = { title, text, id:uuidv4() };
      
      //Get existing notes, add new note, write and return updated note
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);

    }

    removeNote(id) {
     // Retrieves notes and removes the note with the proper id, returns remaining notes
     return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))   
        .then((filteredNotes) => this.write(filteredNotes));
    }

}

module.exports = new Store();