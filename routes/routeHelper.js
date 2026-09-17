
/**
 * Helper function to parse the request body into JSON.
 *
 * @param {http.IncomingMessage} req - Incoming request; body contains JSON to be parsed
 */
async function parseBody(req) {
    let body = "";
    
    for await (const chunk of req) {
        body += chunk;
    }

    return JSON.parse(body);
}

module.exports = {
    parseBody,
}