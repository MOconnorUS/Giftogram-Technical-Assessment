const pool = require('../db');

// NOTE: should abstract the chunk processing into a neutral helper file for all
// routes to be reusable instead of copy and pasted
async function registration(req, res) {
    let body = "";
    
    for await (const chunk of req) {
        body += chunk;
    }

    const data = JSON.parse(body);
    // From here we want to check if the user's email already exists within the DB
    // If yes return an error code saying there is already and account under that email otherwise <- can change to attempting an insert with
    // Email as unique and if it fails we can use that for error response
    // Return success 

    try {
        const [result] = await pool.execute(
            "INSERT INTO users (user_email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)",
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
        res.end(JSON.stringify({ message: "Internal Server Error" }))
    }
}

async function login(req, res) {
    let body = "";
    
    for await (const chunk of req) {
        body += chunk;
    }

    const data = JSON.parse(body);
    // From here we want to check the login information, email + pw, against the DB
    // If valid then we return success otherwise some sort of error based on the issue
    // Incorrect email => make an account
    // Incorrect pw but correct email => incorrect pw please try again
}

module.exports = {
    registration,
}