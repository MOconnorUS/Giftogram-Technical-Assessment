const pool = require('../db');

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