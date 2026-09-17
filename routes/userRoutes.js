const pool = require('../db');

async function getAllUsers(req, res, parsedUrl) {
    // Make a simple query to return all users except the user with the id provided
    // Return an error message only if the user id provided doesn't exist. 
    // If there are no other users simply return an empty JSON response.
}