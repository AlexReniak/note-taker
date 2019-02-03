const router = require("express").Router();
const apiRoutes = require("./api");
const htmlRoutes = require("./html/viewRoutes");

// Routes for html and api endpoints
router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

// Display error page
router.get("*", function(req, res) {
  res.send(`<h1>404: Woah woah woah. YOU messed up BIG time.</h1>`)
});

module.exports = router;