import VoteButton from "./VoteButton"

function ArticleDetails({article}){
    if (!article) return null
    
    return(
        <div className="article-details">
            <div className="article-meta">
                <span>Posted by u/{article.author}</span>
                <span className="meta-separator">•</span>
                <span>r/{article.topic}</span>
            </div>
            <h1>{article.title}</h1>
            <p className="article-body">{article.body}</p>
            <VoteButton article_id={article.article_id} initialVotes={article.votes} />
        </div>
    )
}

export default ArticleDetails