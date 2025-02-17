import ArticleCard from "./ArticleCard"

function ArticleList ({articles}) {
    return (
        <div className="article-list">
            {articles.map((article) => (
                <ArticleCard key={article.article_id} article={article} />
            ))}
        </div>
    )
}

export default ArticleList