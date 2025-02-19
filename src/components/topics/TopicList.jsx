import TopicCard from "./TopicCard"

function TopicList ({topics}){
    return (
        <div className="topic-list">
            {topics.map((topic) => (
                <TopicCard key={topic.slug} topic={topic}/>
            ))}
        </div>
    )
}

export default TopicList