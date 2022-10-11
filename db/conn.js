const mysql = require('mysql')

const pool = mysql.createPool({
  //Infos excluídas
})

module.exports = pool