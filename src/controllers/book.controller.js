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
let nextBookId = Math.max(0, ...books.map((book) => book.id)) + 1;

const parseBookId = (value) => {
    if (!/^[1-9]\d*$/.test(value)) {
        return null;
    }

    const id = Number(value);
    return Number.isSafeInteger(id) ? id : null;
};

const getBookFields = (body) => {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return null;
    }

    const fields = {};
    for (const name of ["title", "author"]) {
        const value = body[name];
        if (typeof value !== "string" || !value.trim()) {
            return null;
        }
        fields[name] = value.trim();
    }

    return fields;
};

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
    const id = parseBookId(req.params.id);
    if (id === null) {
        return res.status(400).json({
            success: false,
            message: "Book ID must be a positive integer.",
        });
    }

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
    const fields = getBookFields(req.body);
    if (!fields) {
        return res.status(400).json({
            success: false,
            message: "Title and author must be non-empty strings.",
        });
    }

    const newBook = {
        id: nextBookId++,
        ...fields,
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
    const id = parseBookId(req.params.id);
    if (id === null) {
        return res.status(400).json({
            success: false,
            message: "Book ID must be a positive integer.",
        });
    }

    const book = books.find((book) => book.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found.",
        });
    }

    const fields = getBookFields(req.body);
    if (!fields) {
        return res.status(400).json({
            success: false,
            message: "Provide non-empty title and author strings.",
        });
    }

    Object.assign(book, fields);

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
    const id = parseBookId(req.params.id);
    if (id === null) {
        return res.status(400).json({
            success: false,
            message: "Book ID must be a positive integer.",
        });
    }

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
