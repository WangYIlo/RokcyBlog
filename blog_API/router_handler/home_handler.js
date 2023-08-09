const query=require('../db/index')


exports.getHomeInformation=async(req,res)=>{

    const sqlCategory=`SELECT c.id, c.category_name, COUNT(*) AS count
FROM article a
JOIN categories c ON a.category_id = c.id
where a.is_published=1 and a.user_id=?
GROUP BY c.id, c.category_name`
    const sqlPublishArticle=`select count(*) as total from article where is_published=1`
    const sqlTag=`SELECT t.*, COUNT(at.article_id) AS value
    FROM tag t
    left JOIN article_tag at ON at.tag_id = t.id
    left join article a on at.article_id=a.id
    where a.is_published=1
    GROUP BY t.name`

    const categories=await query(sqlCategory,req.auth.id)
    const articles=await query(sqlPublishArticle)
    const tags=await query(sqlTag)


    res.send({
        categories,
        articleTotal:articles[0].total,
        tags
    })
}