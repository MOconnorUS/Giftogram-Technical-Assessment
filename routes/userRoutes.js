const pool = require('../db');

/**
 * Fetches all users id, email, first name, and last name aside from the requester's.
 *
 * @param {http.IncomingMessage} req - Incoming request; body contains { requester_user_id }.
 * @param {http.ServerResponse} res - Response used to send back user information or a potential error.
 */
async function getAllUsers(req, res, parsedUrl) {
    let body = "";
    
    for await (const chunk of req) {
        body += chunk;
    }

    const data = JSON.parse(body);

    try {
        const [rows] = await pool.execute(
            `
            SELECT id, email, first_name, last_name FROM users 
            WHERE id != ?
            `,
            [data.requester_user_id]
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            "users": rows
        }));
    } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }

    return;
}

module.exports = {
    getAllUsers,
}