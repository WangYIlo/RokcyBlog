const query = require('../db/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config=require('../config')



//register
exports.register = async (req, res) => {
    const { username, password, role, email } = req.body
    //检查用户名是否被占有
    try {
        const sql1 = `select * from user where username=?`
        const result1 = await query(sql1, username)
        if (result1.length > 0) {
            return res.status(400).send('用户名已存在,请重新注册!');
        }
        hashPassword = await bcrypt.hash(password, 10)
        //插入数据库
        const sql2 = `insert into user set ?`
        const result2 = await query(sql2, { username, password: hashPassword, role, email })
        if (result2.affectedRows !== 1) {
            throw new Error('注册失败，请稍后再试！');
        }
        res.status(200).send('注册成功!');
    } catch (error) {
        res.status(500).send('服务器错误')
    }
}
//login
exports.login = async (req, res) => {
    const { username, password } = req.body
    //检查用户名和密码是否正确
    try {
        const sql = `select * from user where username=? `
        const result = await query(sql, username)
        if (result.length !== 1) {
            return res.status(404).send('用户名不存在')
        }
        const compareResult = await bcrypt.compare(password, result[0].password)
        if (!compareResult) {
            return res.status(201).send('密码或用户名错误')
        }
        //生成JWT返回---avatar太大
        const user={...result[0],password:'',avatar:''}
        const token=jwt.sign(user,config.jwtSecretKey,{expiresIn:'24h'})
        res.status(200).send({
            message:'登录成功',
            token:'Bearer '+token
        })

    } catch (error) {
        res.status(500).send('服务器错误')
    }
}




