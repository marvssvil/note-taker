//require express
const express = require('express');
//require path
const path = require('path');
//require fs
const fs = require('fs');
//require util
const util = require('util');

//async
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//server
const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//GET
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

//POST
app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./develop/db/db.json").then(function(data){
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});

//delete
app.delete("/api/notes/:id", function(req, res) {
    const deleteID = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotes = []
        for (let i = 0; i < notes.length; i++) {
            if(deleteID !== notes[i].id) {
                newNotes.push(notes[i])
            }
        }
        return newNotes
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.send('Deleted note');
    })
})

//routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//listening
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });


