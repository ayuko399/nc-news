import { useState } from "react";
import { postComment } from "../../api";

function AddCommentForm({article_id, onAddComment}){
    const [newComment, setNewComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!newComment.trim()) {
            setError("Comment cannot be empty")
            return
        }

        setError(null)
        setSuccessMsg("")
        setIsSubmitting(true)

        postComment(article_id, {body: newComment})
        .then((data)=>{
            onAddComment(data.comment)
            setNewComment("")
            setSuccessMsg("Comment posted successfully")
        })
        .catch((err) => {
            setError("Failed to post comment. ")
        })
        .finally(()=>{
            setIsSubmitting(false)
            setTimeout(() => {
                setSuccessMsg("")
            }, 10000)
        })
    }

    return(
        <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value)
                if(error) setError(null)
            }}
              placeholder="join the conversation..."
              disabled={isSubmitting}
              className={error ? "error" : ""}
            />
            {error && <p className="error-message">{error}</p>}
            {successMsg && <p className="success-message">{successMsg}</p>}
            <button 
              type="submit"
              diabled={isSubmitting || !newComment.trim()}
            >
                {isSubmitting ? "Posting..." : "Post"}
            </button>
        </form>
    )
}

export default AddCommentForm