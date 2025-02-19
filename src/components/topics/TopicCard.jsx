import { Link } from "react-router-dom"

function TopicCard({topic}){
    if (!topic) return null
    return (
        <div className="topic-card">
            <div className="topic-content">
                <Link to={`/topics/${topic.slug}`} className="topic-link-header">
                    <h2>{topic.slug}</h2>
                </Link>
                <p className="topic-description">
                    {topic.description}
                </p>
            </div>
        </div>
    )
}

export default TopicCard