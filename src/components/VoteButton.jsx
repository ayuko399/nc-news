import { useState } from "react";

function VoteButton({article_id, initialVotes}){
    const [voteChange, setVoteChange] = useState(0)
    const [error, setError] = useState(null)

    const currentVotes = Number(initialVotes) + Number(voteChange)

    return (
        <div className="vote-buttons">
            <button 
                className={`vote-button ${voteChange === 1 ? "voted" : ""}`} 
            >
            ▲ 
            </button>
            <span>{currentVotes}</span>
            <button 
                className={`vote-button ${voteChange === -1 ? "voted" : ""}`}  
            >
            ▼
            </button>
            {error && <p className="vote-error">{error}</p>}
        </div>
    )
    } 


export default VoteButton