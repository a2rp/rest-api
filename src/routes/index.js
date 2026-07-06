/**
 * ------------------------------------------------------------------
 * File: index.js
 * Description: Defines the application's root routes.
 * ------------------------------------------------------------------
 */

// Import the Express framework
const express = require("express");

// Import controller methods
const { getHome } = require("../controllers");

// Create a new router instance
const router = express.Router();

// Handle GET requests to the root endpoint (/)
router.get("/", getHome);

// Export the router
module.exports = router;
