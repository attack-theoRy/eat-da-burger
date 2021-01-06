
// connection file

const mysql = require("mysql")
let connection

connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "omnicode",
    database: "burgers_db",
});

connection.connect(function(err) {
    if (err) throw (err);
});

module.exports = connection;