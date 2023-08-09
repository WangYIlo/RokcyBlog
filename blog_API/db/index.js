//导入 mysql 模块
const mysql = require('mysql')
// 创建数据库连接对象
const db = mysql.createConnection({
host: '127.0.0.1',
user: 'root',
password: 'admin123',
database: 'myblog',
})

db.connect()

//使用Promise封装数据库查询操作
function query(sql, values) {
    return new Promise((resolve, reject) => {
      db.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }


// 向外共享 db 数据库连接对象
module.exports = query
