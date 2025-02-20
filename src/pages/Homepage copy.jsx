import { useState, useEffect } from "react";
import { getArticles } from "../api";
import ArticleList from "../components/ArticleList";
import { useSearchParams } from "react-router-dom";
import SortControls from "../components/comments/SortControls";
import Pagination from "../components/comments/Pagination";

function Homepage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams] = useSearchParams()

    useEffect(()=>{
        setIsLoading(true)

        const params = {
            sort_by: searchParams.get('sort_by') || 'created_at',
            order: searchParams.get('order') || 'desc',
            p: searchParams.get('p') || 1,
            limit: 10
        };
 
        getArticles(params)
        .then((data)=> {
            setArticles(data.articles.articles)
            setTotalCount(data.articles.total_count)
        })
        .catch((err) => {
            setError("Failed to fetch articles")
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [searchParams])

    if (isLoading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">{error}</p>


    return (
        <div className="homepage">
            <h2 className="homepage-title">Latest Articles</h2>
            <SortControls />
            <ArticleList articles={articles} />
            <Pagination totalCount={totalCount} />
        </div>
    )
}

export default Homepage