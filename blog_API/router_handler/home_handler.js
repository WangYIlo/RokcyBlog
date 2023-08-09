const query=require('../db/index')


exports.getHomeInformation=async(req,res)=>{

    const sqlCategory=`select * from categories where user_id=?`
    const sqlPublishArticle=`select count(*) as total from article where is_published=1`
    const sqlTag=`SELECT t.*, COUNT(at.article_id) AS article_count
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