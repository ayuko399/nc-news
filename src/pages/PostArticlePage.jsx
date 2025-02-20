import { useEffect, useState } from "react"
import { getTopics, postArticle } from "../api"
import { useUser } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom";

function PostArticlePage () {
    const navigate = useNavigate()
    const { user } = useUser();
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [topics, setTopics] = useState([])
    const [body, setBody] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [articleId, setArticleId] = useState(0)

    useEffect(()=>{
        getTopics()
        .then((data) => {
            if (data && Array.isArray(data.topics)){
                setTopics(data.topics)
                console.log("setting topics: ", topics)
            }
        })
        .catch((err)=>{
            setError(err.response.data.msg)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title.trim() || !body.trim() || !topic) {
            setError("Please fill in all fields");
            return;
        }

        setError(null)
        setSuccessMsg("")
        setIsSubmitting(true)

        const newArticle = {
            title: title.trim(),
            topic,
            author: user.username,
            body: body.trim()
        }

        postArticle(newArticle)
        .then((data)=>{
            setSuccessMsg("Article posted successfully")
            setTitle("")
            setBody("")
            setTopic("")

            setTimeout(()=>{
                navigate(`/articles/${data.article.article_id}`)
            }, 2000)
        })
        .catch((err) => {
            setError(err.response.data.msg)
        })
        .finally(()=>{
            setIsSubmitting(false)
        })
    }

    return (
      <div className="homepage">
        <h2 className="homepage-title">Post New Article</h2>
        <form onSubmit={handleSubmit} className="article-form">
            <select value={topic} onChange={(e) => setTopic(e.target.value)} required>
                <option value="">Select a topic</option>
                {topics.map((top)=>(
                    <option key={top.slug} value={top.slug}>
                        {top.slug}
                    </option>
                ))}
            </select>
            <input
                type="text" placeholder="title" value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea 
             value={body}
             onChange={(e) => setBody(e.target.value)}
             placeholder="type your post here"
             required
            />

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Submit"}
            </button>
        </form>
        {error && <p className="error">{error}</p>}
        {successMsg && <p className="success">{successMsg}</p>}
      </div>
    )
}

export default PostArticlePage