import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleList from "../components/ArticleList";

function TopicsArticlePage(){
    const {topic_slug} = useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setIsLoading(true)

        getArticles({topic: topic_slug})
        .then((data) => {
            setArticles(data.articles.articles)
        })
        .catch((err) => {
            if (err.response?.status===404){
                setError(`Topic '${topic_slug}' does note exist`)
            } else {
                setError("Failed to fetch articles")
            }
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [topic_slug])

    if (isLoading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <div className="homepage">
            <div className="topic-info">
                <span className="topic-label">{topic_slug}</span>
            </div>
            <ArticleList articles={articles} />
        </div>
    )
    
}



export default TopicsArticlePage