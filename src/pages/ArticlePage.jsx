import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import  {getArticle, getCommentsByArticleId}  from "../api"
import ArticleDetails from "../components/ArticleDetails"
import CommentList from "../components/comments/CommentList"

function ArticlePage(){
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        Promise.all([
            getArticle(article_id),
            getCommentsByArticleId(article_id)
        ])
        .then(([articleData, commentsData]) => {
            setArticle(articleData.article)
            setComments(commentsData.comments)
        })
        .catch((err) => {
            console.error("error: ", err)
            setError("Failed to fetch data")
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [article_id])

    if (isLoading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">{error}</p>

    return(
        <div className="article-page">
            <ArticleDetails article={article} />
            <CommentList comments={comments} />
        </div>
    )
}

export default ArticlePage