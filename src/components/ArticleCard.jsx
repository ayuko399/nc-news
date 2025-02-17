import { Link } from "react-router-dom"
import VoteButton from "./VoteButton"

function ArticleCard({article}) {
    if (!article) return null
    return (
        <div className="article-card">
          <div className="article-content">
            <div className="article-meta">
                <Link to={`/topics/${article.topic}`} className="topic-link">
                    r/{article.topic}
                </Link>
                <span className="meta-separator">•</span>
                <span>Posted by</span>
                <Link to={`/users/${article.author}`} className="author-link">
                    u/{article.author}
                </Link>
            </div>

            <Link to={`/articles/${article.article_id}`} className="article-title">
                <h2>{article.title}</h2>
            </Link>
            
            <p className="article-preview">
                {article.body}
            </p>

            <div className="article-footer">
              <VoteButton
                article_id={article.article_id}
                initialVotes= {article.votes}
             />
                <Link to={`/articles/${article.article_id}`} className="comments-link">
                💭 {article.comment_count} comments
                </Link>
            </div>
            </div>
        </div>
    )
}

export default ArticleCard