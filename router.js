const auth = require("./routes/authRoutes");
const message = require("./routes/messageRoutes");
const user = require("./routes/userRoutes");

const routes = {
    "POST /register": auth.registration,
    "POST /login": auth.login,
    "POST /send_message": message.sendMessage,
    "GET /view_messages": message.getMessages,
    "GET /list_all_users": user.getAllUsers,
}

/**
 * Confirms the integrity of the request from the user or invalidates their request.
 *
 * @param {http.IncomingMessage} req - Incoming request; body contains { req, res, parsedUrl }.
 * @param {http.ServerResponse} res - Response used to send an error message or pass the request to the appropriate endpoint.
 */
module.exports = function dispatch(req, res, parsedUrl) {
    const handler = routes[`${req.method} ${parsedUrl.pathname}`]

    if (!handler) {
        res.writeHead(404);
        res.end(JSON.stringify({
            "error_code": 404,
            "error_title": "Endpoint Not Found",
            "error_message": "The endpoint you are attempting does not exist."
        }));
        return;
    }

    handler(req, res, parsedUrl)
}