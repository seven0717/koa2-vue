const Client = require('mysql-pro');
const db = new Client({
  mysql:{
    host:'localhost',
    port:3306,
    database:'vue-koa2',
    user:'root',
    password:'root'
  }
})

module.exports = db;
