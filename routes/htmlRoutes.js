const path = require("path");

module.exports = (app) => {
  // These should direct a user to the appropriate parts of the site based on the "/whatever" at the end of the URL
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}