

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