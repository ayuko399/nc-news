import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import  {getArticle}  from "../api"
import ArticleDetails from "../components/ArticleDetails"

function ArticlePage(){
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getArticle(article_id)
        .then((data) => {
            console.log("getArticle response: ", data)
            setArticle(data.article)
        })
        .catch((err) => {
            console.error("error: ", err)
            setError("Failed to fetch articles")
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
        </div>
    )
}

export default ArticlePage