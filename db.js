const mysql = require('mysql2')

const con =  mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Ramkrishna123",
    database: "login",
    port:"3306",
    connectTimeout:"15000"

    
})
module.exports=con.promise()