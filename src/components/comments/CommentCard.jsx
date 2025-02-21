import VoteButton from "../VoteButton"
import { useUser } from "../../contexts/UserContext"
import { useState } from "react"
import { deleteComment } from "../../api"


function CommentCard ({comment, onDelete}) {
    console.log("Comment prop received:", comment)

    const {user} = useUser()
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()

        setIsDeleting(true)
        
        deleteComment(comment.comment_id)
        .then((response) => {
            onDelete(comment.comment_id)
            setSuccessMsg("Comment deleted successfully")
        })
        .catch((err) => {
            console.error("Delete failed:", err)
            setError("Failed to delete comment")
        })
        .finally(()=>{
            setIsDeleting(false)
        })
    }

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
                    {user.username === comment.author && 
                    <button 
                        type="submit"
                        className="comment-delete"
                        onClick={handleSubmit}
                    >
                        delete</button>}
            </div>
        </div>
    )
}

export default CommentCard