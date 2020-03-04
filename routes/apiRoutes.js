let db = require("../db/db.json");

module.exports = (app) => {

  // This should bring up the info from the db.json
  app.get("/api/notes", (req, res) => {
    res.json(db);
  });

// This "should" push the new note to the db.json.  "should", but idk
  app.post("/api/notes", (req, res) => {
    db.push(req.body);
  });
}