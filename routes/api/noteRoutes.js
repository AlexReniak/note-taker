const router = require("express").Router();
const dbConnection = require("../../db/connection");


// Methods for /api/notes. Get, post, and delete
router
  .route("/")
  .get(function(req, res) {

  dbConnection.query("SELECT * FROM notes", 
  function(err, notesDB) {
    res.json(notesDB);
  });
})
.post(function(req, res) { 
  dbConnection.query("INSERT INTO notes SET ?", req.body, 
  function(err, notesDB) {

   if (err) {
     throw err;
   }

   console.log(req.body);
   console.log(notesDB)
  });
})
.delete(function (req, res) {

  dbConnection.query("DELETE FROM notes WHERE id = ?", req.body.id, function (err, notesDB) {
    if (err) {
      throw err;
    }
    console.log(res.json(notesDB));
  });
 });

module.exports = router;