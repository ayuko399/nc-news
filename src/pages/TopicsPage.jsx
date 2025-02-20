import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicList from "../components/topics/TopicList";

function TopicsPage(){
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setIsLoading(true)
        getTopics()
        .then((data) => {
            setTopics(data.topics)
        })
        .catch((err) => {
            setError(err.response.data.msg)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="homepage">
            <h1 className="homepage-title">Topic List</h1>
            <TopicList topics={topics}/>
        </div>
    )
}


export default TopicsPage