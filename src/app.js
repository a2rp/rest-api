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

// Register book routes
app.use("/books", require("./routes/book.routes"));

// Keep unmatched API paths in the same JSON response format
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

// Return malformed and oversized request body errors as JSON
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    if (error.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Request body must contain valid JSON.",
        });
    }

    if (error.type === "entity.too.large") {
        return res.status(413).json({
            success: false,
            message: "Request body is too large.",
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error.",
    });
});

// Export the Express application
module.exports = app;
