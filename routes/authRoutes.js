const pool = require('../db');
const { parseBody } = require('./routeHelper');

/**
 * Register's a new user as long as their email is not taken.
 *
 * @param {http.IncomingMessage} req - Incoming request; body contains { email, password, first_name, last_name }.
 * @param {http.ServerResponse} res - Response used to send back the user's information or an error message.
 */
// NOTE: should abstract the chunk processing into a neutral helper file for all
// routes to be reusable instead of copy and pasted
async function registration(req, res) {
    let data;

    try {
        data = await parseBody(req);
    } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            "error_code": 400,
            "error_title": "Invalid JSON",
            "error_message": "Malformed JSON in the request."
         }));

        return;
    }

    try {
        const [result] = await pool.execute(
            "INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)",
            [data.email, data.password, data.first_name, data.last_name]
        );

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ 
            "user_id": result.insertId,
            "email": data.email,
            "first_name": data.first_name,
            "last_name": data.last_name
        }));
    } catch (err) {
        if (err.code == "ER_DUP_ENTRY") {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ 
                "error_code": 101, 
                "error_title": "Email already in use", 
                "error_message": "There is already an account associated with this email."
            }));
            return;
        }

        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }

    return;
}

/**
 * Verifies a user's login credentials.
 *
 * @param {http.IncomingMessage} req - Incoming request; body contains { email, password }.
 * @param {http.ServerResponse} res - Response used to send back the user's information or an error message.
 */
async function login(req, res) {
    let data;

    try {
        data = await parseBody(req);
    } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            "error_code": 400,
            "error_title": "Invalid JSON",
            "error_message": "Malformed JSON in the request."
         }));
         
        return;
    }

    try {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [data.email]
        );
        
        if (rows.length == 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                "error_code": 404,
                "error_title": "Not Found",
                "error_message": "No account found with the given email. Please make an account and try again."
            }));
            return;
        }
        
        if (rows[0].password_hash !== data.password) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                "error_code": 400,
                "error_title": "Incorrect Password",
                "error_message": "Incorrect password provided. Please try again."
            }));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            "user_id": rows[0].id,
            "email": rows[0].email,
            "first_name": rows[0].first_name,
            "last_name": rows[0].last_name
        }));
    } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }

    return;
}

module.exports = {
    registration,
    login
}