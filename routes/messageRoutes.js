const pool = require('../db');

async function getMessages(req, res, parsedUrl) {
    // Utilize the parsed url for the necessary user params
    // Perform a simple query to access the records where the users messages one another
    // Upon a lookup error return an error message <- shouldn't have to check if each user is valid
    // Since if one or more users are incorrect the query will fail
}

async function sendMessage(req, res) {
    let body = "";
    
    for await (const chunk of req) {
        body += chunk;
    }

    const data = JSON.parse(body);

    // Ensure both users are valid and then make a query to add the message to the db and send a success
    // If any error is encountered return error response

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
}
