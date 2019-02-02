const express = require("express");
const dbConnection = require("./db/connection");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Get notes from database
app.get("/api/notes", function(req, res) {
  dbConnection.query("SELECT * FROM notes", 
  function(err, notesDB) {
    res.json(notesDB);
  })
})

// Save new notes to database
app.post("/api/notes", function(req, res) {

 dbConnection.query("INSERT INTO notes SET ?", req.body, 
 function(err, notesDB) {
  if (err) {
    throw err;
  }

  console.log("This message is second");

  console.log(req.body);
  console.log(notesDB)
 })
});

app.delete("/api/notes", function (req, res) {
  dbConnection.query("DELETE FROM notes WHERE id = ?", req.body.id, function (err, notesDB) {
    if (err) {
      throw err;
    }
    console.log(res.json(notesDB));
  })
})

// Path to index.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/html/index.html"));
});

// Path to notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/html/notes.html"));
});

// app.get("*", function(req, res) {
//   res.send(`<h1>404: Woah woah woah. You messed up BIG time.</h1>`)
// })

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});