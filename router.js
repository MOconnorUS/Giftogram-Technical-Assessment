// Going to use this to create a route table to feed to the server.
// May be slightly overengineering the simple backend but this is how I would typically design one.

const auth = require("./routes/authRoutes");

const routes = {
    "POST /register": auth.registration,
    "POST /login": auth.login,
}

module.exports = function dispatch(req, res, parsedUrl) {
    const handler = routes[`${req.method} ${parsedUrl.pathname}`]

    if (!handler) {
        res.writeHead(404);
        res.end("Not Found");
        return;
    }

    handler(req, res, parsedUrl)
}