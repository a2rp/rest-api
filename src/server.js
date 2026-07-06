/**
 * ------------------------------------------------------------------
 * File: server.js
 * Description: Starts the Express HTTP server.
 * ------------------------------------------------------------------
 */

// Load environment variables from the .env file
require("dotenv").config();

// Import the Express application
const app = require("./app");

// Read the server port from environment variables
const PORT = process.env.PORT || 1198;

// Start the HTTP server
app.listen(PORT, () => {
    // Display a success message in the terminal
    console.log(`Server is running on http://localhost:${PORT}`);
});
