import { useSearchParams } from "react-router-dom";

function SortControls(){
    const [searchParams, setSearchParams] = useSearchParams()
    const currentSort = searchParams.get("sort_by") || "created_at"
    const currentOrder = searchParams.get("order") || "desc"

    const handleSortChange = (e) => {

        const newParams = new URLSearchParams(searchParams)
        newParams.set("sort_by", e.target.value)
        newParams.set("order", currentOrder)
        setSearchParams(newParams)
    }

    const toggleOrder = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("order", currentOrder === "desc" ? "asc" : "desc")
        setSearchParams(newParams)
    }

    return (
        <div className="sort-controls">
            <select
                value={currentSort}
                onChange={handleSortChange}
                className="sort-select"
            >
                <option value="created_at">Date</option>
                <option value="comment_count">Comments</option>
                <option value="votes">Votes</option>
            </select>
            <button onClick={toggleOrder} className="order-button">
                {currentOrder === "desc" ? "▼ Descending" : "▲ Ascending"}
            </button>
        </div>
    )
}


export default SortControls