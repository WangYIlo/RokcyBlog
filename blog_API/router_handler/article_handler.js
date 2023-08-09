
const query = require('../db/index')
const path = require('path');
const moment = require('moment');
const fs = require('fs');

//发表文章
exports.addArticle = async (req, res) => {
    try {
        const { tags, ...userWithoutTags } = req.body
        console.log(req.body);
        const picture = req.file ? path.join('/uploads', req.file.filename) : null;
        const user = {
            ...userWithoutTags,
            picture,
            user_id: req.auth.id
        }
        //发布文章sql
        const sql = `INSERT INTO article SET ?`
        const result = await query(sql, user)
        if (result.affectedRows !== 1) return res.status(400).send('发布文章失败')

        const articleId = result.insertId;

        if (Array.isArray(tags) && tags.length) {
            for (const tag of tags) {
                const tagArticleInsertSql = 'INSERT INTO article_tag (article_id, tag_id) VALUES (?, ?)';
                const result = await query(tagArticleInsertSql, [articleId, tag]);
                console.log(result);
            }
        }

        res.status(200).send('发布文章成功')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}

//修改现有文章--id
exports.updateArticle = async (req, res) => {
    try {
        const { tags, ...userWithoutTags } = req.body
        const id = req.params.id
        //判断picture是新来的文件还是已有的数据
        const picture = req.file ? path.join('/uploads', req.file.filename) : req.body.picture;
        const user = {
            ...userWithoutTags,
            picture,
            user_id: req.auth.id
        }
        const sql = `update article set ? where id=?`
        const result = await query(sql, [user, id])
        if (result.affectedRows !== 1) return res.status(400).send('修改文章失败')

        //标签
        if (Array.isArray(tags) && tags.length) {
            const deleteTagsSql = 'DELETE FROM article_tag WHERE article_id = ?';
            await query(deleteTagsSql, [id]); // 先删除原有的标签

            for (const tag of tags) {
                const tagArticleUpdateSql = 'INSERT INTO article_tag (article_id, tag_id) VALUES (?, ?)';
                const result = await query(tagArticleUpdateSql, [id, tag]);
            }
        }

        res.status(200).send('修改文章成功')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}

//删除现有文章--id(未完成)
exports.deleteArticle = async (req, res) => {
    try {
        const sql = `select picture from article where id=?`
        const sql2 = `delete from article where id=?`
        const id = req.params.id
        //查询
        const result = await query(sql, id)
        if (result.length !== 1) return res.status(400).send('删除失败,文章可能不存在')
        //删除
        const result2 = await query(sql2, id)

        //获取文件图片绝对路径
        const picturePath = path.join(path.dirname(__dirname), result[0].picture)

        fs.unlink(picturePath, (err) => {
            if (err) {
                console.error('文件删除失败', err);
                return;
            }
            console.log('文件删除成功');
        });

        res.status(200).send('删除成功')

    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}

//根据id获取单个文章--id
exports.getArticleByid = async (req, res) => {
    try {
        const id = req.params.id
        const sql =
            `SELECT * FROM article where id=?`
        const tagSql = `SELECT tag.id, tag.name
        FROM tag
        left JOIN article_tag ON tag.id = article_tag.tag_id
        WHERE article_tag.article_id = ?`
        const result = await query(sql, id)
        const tagArray = await query(tagSql, id)
        console.log(result[0], tagArray);
        if (!result[0]) return res.status(400).send('获取失败，该文章不存在')

        const data = result.map((obj) => {
            let created_time = obj.created_time
            let update_time = obj.update_time
            created_time = moment(created_time).format('YYYY-MM-DD HH:mm:ss')
            update_time = moment(update_time).format('YYYY-MM-DD HH:mm:ss')
            return { ...obj, created_time, update_time }
        });

        const tags = tagArray.reduce((pre, next) => {
            return pre.concat(next);
        }, [])

        res.status(200).send({
            message: '获取成功',
            data,
            tags
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}

//分页获取文章--1.按照分类id查 2.查全  3.根据publish和分类id查 4.根据tagId-----可以扩增功能(带title寻找)
exports.getArticleByPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 10
        const offset = (page - 1) * pageSize
        //no id
        //获取文章
        let sql1 =
            `SELECT
            article.*,
            categories.category_name AS category_name,
            (
                SELECT GROUP_CONCAT(
                    JSON_OBJECT('id', tag.id, 'name', tag.name, 'color', tag.color)
                )
                FROM article_tag
                INNER JOIN tag ON article_tag.tag_id = tag.id
                WHERE article_tag.article_id = article.id
            ) AS tags
        FROM
            article
        LEFT JOIN categories ON article.category_id = categories.id`
        let params = [pageSize, offset]
        let countparams = []
        //have id
        if (req.query.categoryId && !req.query.publish) {
            sql1 += ' WHERE article.category_id = ?'
            params = [req.query.categoryId, pageSize, offset]
            countparams = [req.query.categoryId]
        }
        //only have publish
        if (!req.query.categoryId && !req.query.tagId && req.query.publish) {
            sql1 += ' WHERE article.is_published = ?'
            params = [req.query.publish, pageSize, offset]
            countparams = [req.query.publish]
        }
        //have id and pulish
        if (req.query.categoryId && req.query.publish) {
            sql1 += ` WHERE article.category_id = ? and article.is_published=?`
            params = [req.query.categoryId, req.query.publish, pageSize, offset]
            countparams = [req.query.categoryId, req.query.publish]
        }
        //have tagId&&have publish
        if (req.query.tagId && req.query.publish) {
            console.log('1');
            sql1 += ` WHERE article.id IN ( SELECT article_id FROM article_tag WHERE tag_id = ? ) and article.is_published=?`
            params = [req.query.tagId, req.query.publish, pageSize, offset]
            countparams = [req.query.tagId, req.query.publish]
        }

        const sql2 = `${sql1} ORDER BY article.id LIMIT ? OFFSET ?`
        const result = await query(sql2, params)
        const data = result.map((obj) => {
            if (obj.tags) {
                const tagsArray = obj.tags.split('},')
                const tags = tagsArray.map((tag, index) => {
                    //只要不是最后一个需要补全 右括号
                    if (index < tagsArray.length - 1) {
                        tag += "}";
                    }
                    return JSON.parse(tag);
                })
                obj.tags = tags
            }
            let created_time = obj.created_time
            let update_time = obj.update_time
            created_time = moment(created_time).format('YYYY-MM-DD HH:mm:ss')
            update_time = moment(update_time).format('YYYY-MM-DD HH:mm:ss')
            return { ...obj, created_time, update_time }
        });

        //查询总数
        let countSql = `SELECT COUNT(*) AS total FROM (${sql1}) AS countTable`;
        const countResult = await query(countSql, countparams);
        const total = countResult[0].total;



        res.status(200).send({
            message: '获取数据成功',
            data,
            total
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('服务器错误')
    }
}

//publish信息 1-公开  2-草稿
exports.getPublish = (req, res) => {
    const data = [{ id: 0, name: '草稿' }, { id: 1, name: '公开' }]
    res.status(200).send(
        data
    )
}


//随机获取5篇文章
exports.getRandomArticle = async (req, res) => {
    try {
        const sql = 'SELECT id,title,created_time,picture FROM article  where is_published=1  ORDER BY RAND() LIMIT 5';
        const result = await query(sql)
        const data = result.map((obj) => {
            let created_time = obj.created_time
            created_time = moment(created_time).format('YYYY-MM-DD HH:mm:ss')
            return { ...obj, created_time }
        });
        res.status(200).send({
            data
        })
        console.log(result);
    } catch (error) {
        res.status(500).send('服务器错误')
    }
}


//获取公开后的全部文章用于归档
exports.getAllPublishArticle = async (req, res) => {
    const sql = `select id,created_time ,update_time,title from article where is_published=1`

    const result = await query(sql)

    const data = result.map((obj) => {
        let created_time = obj.created_time
        let update_time = obj.update_time
        created_time = moment(created_time).format('YYYY-MM-DD ')
        update_time = moment(update_time).format('YYYY-MM-DD ')
        return { ...obj, created_time, update_time }
    })

    let countSql = `SELECT COUNT(*) AS total FROM (${sql}) AS countTable`;

    const count = await query(countSql)

    res.status(200).send({
        data,
        total:count[0].total
    })
}


