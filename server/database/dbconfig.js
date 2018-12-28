/**
 * 数据库连接基本信息设置，使用连接池来达到资源复用
 * Created by gaoju on 2018/10/30.
 */
var mysql = require('mysql')
//建立连接池
const pool = mysql.createPool({
  host: '192.168.11.231',
  port: 3306,
  user: 'root',
  password: 'IDIILCenter',
  database: 'mathonlinedb',// mathonlinedb
})
console.log("database connecting......")

module.exports = (opt) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(opt.sql, (err, rows) => {
          if (err) {
            console.log(`${opt.name} err: + ${err}`);
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
