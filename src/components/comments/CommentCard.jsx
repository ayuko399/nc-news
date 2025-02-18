import VoteButton from "../VoteButton"


function CommentCard ({comment}) {
    return (
        <div className="comment-card">
            <div className="comment-meta">
                    <span className="comment-author">u/${comment.author}</span>
                </div>
                <p className="comment-body">{comment.body}</p>
                <div className="comment-footer">
                    <VoteButton
                        article_id={comment.comment_id}
                        initialVotes={comment.votes}
                    />
            </div>
        </div>
    )
}

export default CommentCard