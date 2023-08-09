const query = require('../db/index')

//获取文章分类--分页
exports.getAllCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 10
        const offset = (page - 1) * pageSize
        let sql = `SELECT * FROM categories WHERE user_id=?`
        let params=[req.auth.id]
        if(req.query.page && req.query.pageSize){
            sql+=' ORDER BY id LIMIT ? OFFSET ?'
            params=[req.auth.id, pageSize, offset]
        }
        const sql2 = `SELECT COUNT(*) AS count FROM categories;`
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

//添加分类
exports.addCategory = async (req, res) => {
    try {
        const sql1 = `select * from categories where user_id=? and category_name=?`
        const result1 = await query(sql1, [req.auth.id, req.body.name])
        if (result1.length > 0) return res.status(201).send('分类名字不允许重复')
        const sql2 = `insert into categories (category_name,user_id) values (?,?)`
        const result2 = await query(sql2, [req.body.name, req.auth.id])
        if (result2.affectedRows !== 1) return res.status(400).send('插入语句失败')
        res.status(200).send({
            message: '插入成功'
        })
    } catch (error) {
        res.status(500).send('服务器错误')
    }
}

//编辑分类-更新分离
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const sql1 = `select * from categories where user_id=? and category_name=?`
        const result1 = await query(sql1, [req.auth.id, req.body.name])
        if (result1.length > 0) return res.status(201).send('分类名字不允许重复')
        const sql2 = `update categories set category_name=? where id=?`
        const result2 = await query(sql2, [name, id])
        if (result2.affectedRows !== 1) return res.status(400).send('更新失败')
        res.status(200).send('更新成功')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}

//删除分类
exports.deleteCategory = async (req, res) => {
    const sql = `delete from categories where id=?`
    const result = await query(sql, req.params.id)
    if (result.affectedRows !== 1) return res.status(400).send('删除失败')
    res.status(200).send('删除成功')
}