const query=require('../db/index')

//获取全部标签
exports.getAlltag=async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 10
        const offset = (page - 1) * pageSize
        let sql = `SELECT * FROM tag `
        let params
        if(req.query.page && req.query.pageSize){
            sql+=' ORDER BY id LIMIT ? OFFSET ?'
            params=[pageSize, offset]
        }
        const sql2 = `SELECT COUNT(*) AS count FROM tag;`
        const result = await query(sql, params)
        const result2 = await query(sql2)
        res.status(200).send(
            {
                message: '获取分类信息成功',
                data: result,
                total: result2[0].count
            }
        )
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}
//添加标签
exports.addTag=async(req,res)=>{
    try {
        const sql1=`select * from tag where name=?`
        const {name,color}=req.body
        const result1=await query(sql1,name) 
        if(result1.length>0) return res.status(201).send('标签名字不允许重复')
        const sql2=`insert into tag (name, color) values (?, ?)`
        const result2= await query(sql2,[name,color])
        if(result2.affectedRows !== 1) return res.status(400).send('插入语句失败')
        res.status(200).send({
            message:'插入成功'
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}
//编辑标签
exports.updateTag=async(req,res)=>{
    try {
        const {id}=req.params
        const {name,color}=req.body
        const sql1=`select * from tag where name=?`
        const result1=await query(sql1,name) 
        if(result1.length>0 && result1[0].id !== parseInt(id)) return res.status(201).send('标签名字不允许重复')
        const sql2=`update tag set name=?,color=? where id=?`
        const result2= await query(sql2,[name,color,id])
        if(result2.affectedRows !==1 ) return res.status(400).send('更新失败')
        res.status(200).send('更新成功')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}
//删除标签
exports.deleteTag=async(req,res)=>{
    const sql=`delete from tag where id=?` 
    const result=await query(sql,req.params.id)
    if(result.affectedRows!==1) return res.status(400).send('删除失败')
    res.status(200).send('删除成功') 
}

