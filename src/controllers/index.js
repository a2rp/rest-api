/**
 * ------------------------------------------------------------------
 * File: index.js
 * Description: Handles requests for the application's root endpoint.
 * ------------------------------------------------------------------
 */

/**
 * Handle GET requests to the root endpoint (/)
 */
const getHome = (req, res) => {
    // Send a JSON response with basic API information
    res.status(200).json({
        success: true,
        message: "REST API is running...",
        data: {
            name: "REST API",
            version: "1.0.0",
            environment: process.env.NODE_ENV || "development",
        },
    });
};

// Export controller methods
module.exports = {
    getHome,
};
