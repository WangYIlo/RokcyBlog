const query = require('../db/index')
const bcrypt=require('bcrypt')

//获取userinfo
exports.userInfo = async (req, res) => {
    try {
        const sql = `select * from user where id=?`
        const result = await query(sql, req.auth.id)
        if (result.length !== 1) return res.status(404).send('获取用户信息失败')
    
        res.status(200).send({
            message: '获取用户基本信息成功',
            data: result[0]
        })   
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}
//更新userinfo
exports.updateUserInfo = async (req, res) => {
    const user = { ...req.body }
    try {
        const sql = `update user set ? where id=?`
        const result = await query(sql, [user, req.auth.id])
        if (result.affectedRows !== 1) return res.status(404).send('修改失败')
        res.status(200).send('修改用户信息成功')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}
//修改密码
exports.updatePassword = async (req, res) => {
    try {
        const {password}=req.body
        const sql = `select * from user where id=?`
        const result=await query(sql,req.auth.id) 
        console.log(result);
        if(result.length !==1) return res.status(404).send('用户名不存在')
        const sql2=`update user set password=? where id=?`
        const newPwd=await bcrypt.hash(password,10)
        const result2=await query(sql2,[newPwd,req.auth.id])
        if(result2.affectedRows!==1) return res.status(400).send('密码修改失败')
        res.status(200).send('密码修改成功')
    } catch (error) {
        res.status(500).send('服务器错误')
    }
}
