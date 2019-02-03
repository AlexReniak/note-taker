const router = require("express").Router();

const noteRoutes = require("./noteRoutes");

// Specify api routes with endpoint name
router.use("/notes", noteRoutes);

module.exports = router; 