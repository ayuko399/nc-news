import { useState, useMemo } from "react";
import { patchArticleVotes } from "../api";

function VoteButton({article_id, initialVotes}){
    const [voteChange, setVoteChange] = useState(0)
    const [error, setError] = useState(null)

    const handleVote = (increment) => {
        if (increment === voteChange) return

        setVoteChange(increment)

        patchArticleVotes(article_id, increment)
            .catch((err) => {
                setVoteChange((prev) => prev)
                setError("Failed to update vote.")
            })
    }

    const currentVotes = useMemo(() => Number(initialVotes) + Number(voteChange))

    return (
        <div className="vote-buttons">
            <button 
                className={`vote-button ${voteChange === 1 ? "voted" : ""}`}
                onClick={()=>handleVote(1)}
                disabled={voteChange === 1} 
            >
            ▲ 
            </button>
            <span>{currentVotes}</span>
            <button 
                className={`vote-button ${voteChange === -1 ? "voted" : ""}`}  
                onClick={()=>handleVote(-1)} 
                disabled={voteChange === -1}
            >
            ▼
            </button>
            {error && <p className="vote-error">{error}</p>}
        </div>
    )
    } 


export default VoteButton