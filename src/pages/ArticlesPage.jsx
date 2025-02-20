import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleList from "../components/ArticleList";
import SortControls from "../components/comments/SortControls";
import Pagination from "../components/comments/Pagination";

function ArticlesPage(){
    const {topic_slug} = useParams()
    const [searchParams] = useSearchParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalCount, setTotalCount] = useState(0);
    
    useEffect(()=>{
        setIsLoading(true)

        const params = {
            ...(topic_slug&& {topic: topic_slug}),
            sort_by: searchParams.get('sort_by') || 'created_at',
            order: searchParams.get('order') || 'desc',
            p: searchParams.get('p') || 1,
            limit: 10
        };
 
        getArticles(params)
        .then((data)=> {
            if (!data.articles || !data.articles.articles){
                setArticles([])
            } else {
                setArticles(data.articles.articles)
            }
            setTotalCount(data.articles.total_count)
        })
        .catch((err) => {
            setError(err.response.data.msg)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [topic_slug, searchParams])

    if (isLoading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">{error}</p>


    return (
        <div className="homepage">
            {topic_slug ? (
                <div className="topic-info">
                    <span className="topic-label">{topic_slug}</span>
                </div>
            ):(
                <h2 className="homepage-title">Latest Articles</h2>
            )}
            <SortControls />
            <ArticleList articles={articles} />
            <Pagination totalCount={totalCount} />
        </div>
    )
}

export default ArticlesPage