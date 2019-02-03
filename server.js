const express = require("express");
const routes = require("./routes");

const app = express();

// Set up port
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use routes
app.use(routes);

// Turn on server and console.log message for confirmation
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});