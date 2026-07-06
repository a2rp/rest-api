/**
 * ------------------------------------------------------------------
 * File: bookController.js
 * Description: Handles request and response logic for book resources.
 * ------------------------------------------------------------------
 */

// Store sample books in memory for this REST API example
const books = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
    },
    {
        id: 2,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt and David Thomas",
    },
];

// Handle GET requests to fetch all books
const getBooks = (req, res) => {
    // Send all books as a JSON response
    res.status(200).json({
        success: true,
        message: "Books fetched successfully.",
        data: books,
    });
};

/**
 * Handle GET requests to fetch a single book by its ID
 */
const getBookById = (req, res) => {
    // Convert the route parameter into a number
    const id = Number(req.params.id);

    // Find the matching book
    const book = books.find((book) => book.id === id);

    // Return a 404 response if the book does not exist
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found.",
        });
    }

    // Return the matching book
    res.status(200).json({
        success: true,
        message: "Book fetched successfully.",
        data: book,
    });
};

/**
 * Handle POST requests to create a new book
 */
const createBook = (req, res) => {
    // Read title and author from the request body
    const { title, author } = req.body;

    // Return a 400 response if title or author is missing
    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: "Title and author are required.",
        });
    }

    // Create a new book object
    const newBook = {
        id: books.length + 1,
        title,
        author,
    };

    // Add the new book to the in-memory books array
    books.push(newBook);

    // Return the newly created book
    res.status(201).json({
        success: true,
        message: "Book created successfully.",
        data: newBook,
    });
};

/**
 * Handle PUT requests to update an existing book
 */
const updateBook = (req, res) => {
    // Convert the route parameter into a number
    const id = Number(req.params.id);

    // Read updated values from the request body
    const { title, author } = req.body;

    // Find the matching book
    const book = books.find((book) => book.id === id);

    // Return a 404 response if the book does not exist
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found.",
        });
    }

    // Update the book title if provided
    if (title) {
        book.title = title;
    }

    // Update the book author if provided
    if (author) {
        book.author = author;
    }

    // Return the updated book
    res.status(200).json({
        success: true,
        message: "Book updated successfully.",
        data: book,
    });
};

/**
 * Handle DELETE requests to remove an existing book
 */
const deleteBook = (req, res) => {
    // Convert the route parameter into a number
    const id = Number(req.params.id);

    // Find the index of the matching book
    const bookIndex = books.findIndex((book) => book.id === id);

    // Return a 404 response if the book does not exist
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Book not found.",
        });
    }

    // Remove the matching book from the array
    const deletedBook = books.splice(bookIndex, 1)[0];

    // Return the deleted book
    res.status(200).json({
        success: true,
        message: "Book deleted successfully.",
        data: deletedBook,
    });
};

// Export controller methods
module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
