var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', 
  port:"3307",
  user: 'root',      
  password: '',      
  database: 'onlineauction' 
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;