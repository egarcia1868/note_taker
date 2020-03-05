const fs = require("fs");
const db = require("../db/db.json");
const path = require("path")

module.exports = (app) => {

  // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", (req, res) => {
    res.json(db);
  });

  // * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  app.post("/api/notes", (req, res) => {
    let newID;
    if (db.length < 1) {
      newID = 0;
    } else {
      newID = db[db.length-1].id+1;
    };
    let newNote = req.body;
    newNote.id = newID;
    // let StrNote = JSON.stringify(newNote);
    // let strDb = JSON.stringify(db);
    //                                 console.log(`newNote: ${StrNote} | newID: ${newID} | db: ${strDb}`);
    db.push(newNote);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(db, null, 2), "utf8", err => {
      if (err) throw err;
      console.log("appended!");
      res.json(db)
    });
    
  });

  // * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
  app.delete("/api/notes/:id", (req, res) => {
    let chosen = parseInt(req.params.id);
    console.log("delete step 1 reached");

    for (let i = 0; i < db.length; i++) {
      console.log("delete step 2 reached");
      console.log(`chosen: ${chosen} | db[i].id: ${db[i].id}`);
      console.log(`TYPES chosen: ${typeof chosen} | db[i].id: ${typeof db[i].id}`);
      if (chosen === db[i].id) {
        db.splice(i, 1);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(db, null, 2), "utf8", err => {
          if (err) throw err;
          console.log("deleted!");
          res.json(db)
        });
        break;
      }
    }
  })
}