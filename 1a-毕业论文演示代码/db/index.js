const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'ev_users',
    timezone: "08:00",
    dateString: true
})



module.exports = db