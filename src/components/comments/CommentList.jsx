import CommentCard from "./CommentCard";

function CommentList({comments}) {
    if (!comments.length) return <p>No comments yet. Be the first to comment</p>

    return (
    <div className="comments-list">
         {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
         ))}
    </div>
    )
}

export default CommentList

