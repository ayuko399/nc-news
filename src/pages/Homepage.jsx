import { useState, useEffect } from "react";
import { getArticles } from "../api";
import ArticleList from "../components/ArticleList";

function Homepage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setIsLoading(true)
        getArticles()
        .then((data)=> {
            console.log("getArticles response: ", data)
            setArticles(data.articles.articles)
        })
        .catch((err) => {
            console.error("error: ", err)
            setError("Failed to fetch articles")
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    if (isLoading) return <div className="loading">Loading...</div>
    if (error) return <div className="error">{error}</div>


    return (
        <div className="homepage">
            <h2 className="homepage-title">Latest Articles</h2>
            <ArticleList articles={articles} />
        </div>
    )
}

export default Homepage