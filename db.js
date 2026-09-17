// Will work on database interaction last.
// I still need to decide on the architecture of the DB. It won't be anything crazy complex.
// I'm thinking 2 tables a users and a messages where the messages has 2 foreign keys:
// sender_id and recipient_id both map to user_ids.


// Changed my mind, setting up pooling interaction first. The reason for pooling over a single access point
// Is because I don't want a multiple calls to the DB to be hung up waiting for the single accessor to finish

const mysql = require('mysql2/promise');

const host = process.env.HOST;
const user = process.env.DB_USER;
const pw = process.env.DB_PW;
const database = process.env.DATABASE

const pool = mysql.createPool({
    host: host,
    user: user,
    password: pw,
    database: database,
    waitForConnections: true,
    connectionLimit: 10
})

module.exports = pool;
