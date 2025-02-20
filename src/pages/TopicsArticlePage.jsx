import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleList from "../components/ArticleList";
import SortControls from "../components/comments/SortControls";
import Pagination from "../components/comments/Pagination";
import { useSearchParams } from "react-router-dom";

function TopicsArticlePage(){
    const {topic_slug} = useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams] = useSearchParams()

    useEffect(()=>{
        setIsLoading(true)

        console.log("URL params changed:", {
            topic: topic_slug,
            sort_by: searchParams.get('sort_by'),
            order: searchParams.get('order')
        });

        const params = {
            topic: topic_slug,
            sort_by: searchParams.get('sort_by') || 'created_at',
            order: searchParams.get('order') || 'desc',
            p: searchParams.get('p') || 1,
            limit: 10
        };

        getArticles(params)
        .then((data) => {
            console.log("Response data:", data);
            setArticles(data.articles.articles)
            setTotalCount(data.articles.total_count)
        })
        .catch((err) => {
            console.log("Error response:", err);
            if (err.response?.status===404){
                setError(`Topic '${topic_slug}' does note exist`)
            } else {
                setError("Failed to fetch articles")
            }
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [topic_slug, searchParams])

    if (isLoading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <div className="homepage">
            <div className="topic-info">
                <span className="topic-label">{topic_slug}</span>
            </div>
            <SortControls />
            <ArticleList articles={articles} />
            <Pagination totalCount={totalCount} />
        </div>
    )
    
}



export default TopicsArticlePage