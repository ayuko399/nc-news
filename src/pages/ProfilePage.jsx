import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import ArticleList from "../components/ArticleList";
import { getArticles } from "../api";
import Loading from "../components/loading/Loading";
import ErrorMsg from "../components/loading/ErrorMsg";
import SortControls from "../components/comments/SortControls";
import { useSearchParams } from 'react-router-dom';
import Pagination from "../components/comments/Pagination";


function ProfilePage (){
    const {user} = useUser()
    const [searchParams, setSearchParams] = useSearchParams();
    const author = user.username
    const authorIcon = user.avatar_url
    const [error, setError] = useState(null)
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(()=>{
        setIsLoading(true)

        const params = {
            author: author,
            sort_by: searchParams.get('sort_by') || 'created_at',
            order: searchParams.get('order') || 'desc',
             p: searchParams.get('p') || 1
        }

        console.log('Requesting with params:', params)

        getArticles(params)
            .then((data) => {
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
        }, [author])

    if (isLoading) return <Loading />
    if (error) return <ErrorMsg message={error} />
    
    
    return (
        <div className="homepage">
            <div className="avatar-container">
            <img src={authorIcon} className="avatar" alt="Author avatar"/>
            <h2 className="homepage-title">{author}</h2>
            </div>
            <SortControls />
            <ArticleList articles={articles}/>
            <Pagination totalCount={totalCount} />
        </div>
    )
}

export default ProfilePage