

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
}