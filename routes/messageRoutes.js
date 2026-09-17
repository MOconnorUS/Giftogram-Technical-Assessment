const pool = require('../db');

/**
 * Fetches all messages sent between two valid users.
 *
 * @param {http.IncomingMessage} req - Incoming request; body contains { user_id_a, user_id_b }.
 * @param {http.ServerResponse} res - Response used to send back the messages between two users or a potential error.
 */
// NOTE: someone can use fake users/ones that have no entries and get no errors
async function getMessages(req, res, parsedUrl) {
    let body = "";
    
    for await (const chunk of req) {
        body += chunk;
    }

    const data = JSON.parse(body);

    try {
        const [rows] = await pool.execute(
            `
            SELECT * FROM messages 
            WHERE (sender_id = ? AND recipient_id = ?) OR 
            (sender_id = ? AND recipient_id = ?) 
            ORDER BY sent_timestamp ASC
            `,
            [data.user_id_a, data.user_id_b, data.user_id_b, data.user_id_a]
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            "messages": rows
        }))
    } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }

    return;
}

/**
 * Sends a message from one user to another.
 *
 * @param {http.IncomingMessage} req - Incoming request; body contains { sender_user_id, receiver_user_id, message }.
 * @param {http.ServerResponse} res - Response used to send back a success message or an error message.
 */
async function sendMessage(req, res) {
    let body = "";
    
    for await (const chunk of req) {
        body += chunk;
    }

    const data = JSON.parse(body);

    try {
        [result] = await pool.execute(
            "INSERT INTO messages (sender_id, recipient_id, body) VALUES (?, ?, ?)",
            [data.sender_user_id, data.receiver_user_id, data.message]
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            "success_code": 200,
            "success_title": "Message Sent",
            "success_message": "Message was sent successfully!"
        }));
    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                "error_code": 400,
                "error_title": "Invalid User Ids",
                "error_message": "Either the sender and/or receiver ids are invalid."
             }));
            return;
        }

        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }

    return;
}

module.exports = {
    sendMessage,
    getMessages
}
