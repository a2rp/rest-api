/**
 * ------------------------------------------------------------------
 * File: bookRoutes.js
 * Description: Defines routes for book resources.
 * ------------------------------------------------------------------
 */

// Import the Express framework
const express = require("express");

// Import book controller methods
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require("../controllers/book.controller");

// Create a new router instance
const router = express.Router();

// Handle GET requests to fetch all books
router.get("/", getBooks);

// Handle GET requests to fetch a single book
router.get("/:id", getBookById);

// Handle POST requests to create a new book
router.post("/", createBook);

// Handle PUT requests to update an existing book
router.put("/:id", updateBook);

// Handle DELETE requests to remove an existing book
router.delete("/:id", deleteBook);

// Export the router
module.exports = router;
