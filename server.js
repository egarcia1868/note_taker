const express = require("express");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;

  // console.log(newNote);

  // We then add the json the user sent to the character array
  notes.push(newNote);

  // We then display the JSON to the users
  res.json(newNote);
});



// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));