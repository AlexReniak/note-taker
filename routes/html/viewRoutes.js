const router = require("express").Router();
const path = require("path");

// Display home page
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../../public/html/index.html"));
});

// Display notes page
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../../public/html/notes.html"));
});


module.exports = router;