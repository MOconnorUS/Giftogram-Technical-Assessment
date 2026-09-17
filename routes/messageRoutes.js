const pool = require('../db');

// NOTE: someone can use fake users/ones that have no entries and get no errors
async function getMessages(req, res, parsedUrl) {
    let body = "";
    
    for await (const chunk of req) {
        body += chunk;
    }

    const data = JSON.parse(body);

    try {
        const [rows] = await pool.execute(
            "SELECT * FROM messages WHERE (sender_id = ? AND receipient_id = ?) OR (sender_id = ? AND receipient_id = ?) ORDER BY sent_timestamp ASC",
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

async function sendMessage(req, res) {
    let body = "";
    
    for await (const chunk of req) {
        body += chunk;
    }

    const data = JSON.parse(body);

    try {
        [result] = await pool.execute(
            "INSERT INTO messages (sender_id, receipient_id, body) VALUES (?, ?, ?)",
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
