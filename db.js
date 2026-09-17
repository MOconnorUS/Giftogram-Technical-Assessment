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
