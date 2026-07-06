/**
 * ------------------------------------------------------------------
 * File: app.js
 * Description: Creates and configures the Express application.
 * ------------------------------------------------------------------
 */

// Import the Express framework
const express = require("express");

// Import application routes
const indexRoutes = require("./routes");

// Create a new Express application
const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Register application routes
app.use("/", indexRoutes);

// Export the Express application
module.exports = app;
