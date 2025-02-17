import { useState } from "react";
import { patchArticleVotes } from "../api";

function VoteButton({article_id, initialVotes}){
    const [voteChange, setVoteChange] = useState(0)
    const [error, setError] = useState(null)

    const handleVote = (increment)=>{
        if (increment === voteChange) return

        const newVoteChange = increment

        setVoteChange(newVoteChange)
        setError(null)

        patchArticleVotes(article_id, newVoteChange)
        .catch((err) => {
            setVoteChange(voteChange)
            setError("Failed to update vote.")
        })
    }

    const currentVotes = Number(initialVotes) + Number(voteChange)

    return (
        <div className="vote-buttons">
            <button 
                className={`vote-button ${voteChange === 1 ? "voted" : ""}`}
                onClick={()=>handleVote(1)}    
            >
            ▲ 
            </button>
            <span>{currentVotes}</span>
            <button 
                className={`vote-button ${voteChange === -1 ? "voted" : ""}`}
                onClick={()=>handleVote(-1)}    
            >
            ▼
            </button>
            {error && <p className="vote-error">{error}</p>}
        </div>
    )
    }


export default VoteButton