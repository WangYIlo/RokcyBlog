const query = require('../db/index')

//获取aboutme
exports.getAboutMe=async (req,res)=>{
    try {
        const sql=`select * from aboutme where user_id=?`
        const result= await query(sql,req.auth.id)
        if(!result[0]) return res.status(404).send('获取失败')
         res.status(200).send({
            data:result[0]
        })   
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}

//修改aboutme
exports.updateAboutMe=async(req,res)=>{
    try {
        const sql = `update aboutme set title=?,content=? where user_id=?`
        const result= await query(sql,[req.body.title,req.body.content,req.auth.id])
        if (result.affectedRows !== 1) return res.status(404).send('修改失败')
        res.status(200).send('修改用户信息成功')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}