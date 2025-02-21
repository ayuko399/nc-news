import CommentCard from "./CommentCard";

function CommentList({comments, setComments}) {
    if (!comments.length) return <p>No comments yet. Be the first to comment</p>

    const handleDeleteComment = (comment_id) => {
        setComments(comments.filter(comment => comment.comment_id !== comment_id))
    }

    return (
    <div className="comments-list">
         {comments.map((comment) => (
            <CommentCard 
              key={comment.comment_id} 
              comment={comment}
              onDelete={handleDeleteComment} 
            />
         ))}
    </div>
    )
}

export default CommentList

