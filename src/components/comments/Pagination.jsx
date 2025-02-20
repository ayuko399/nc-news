import { useSearchParams } from "react-router-dom";

function Pagination ({totalCount}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number (searchParams.get("p")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const totalPages = Math.max(1, Math.ceil(totalCount / limit))

    const handlePageChange = (newPage) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set("p", newPage)
            return newParams
        })
    }

    return (
        <div className="pagination">
            {console.log("currentPage:", currentPage, "totalPages:", totalPages)}
            <button
                onClick={()=>handlePageChange(currentPage-1)}
                disabled={currentPage === 1}
                className="page-button"
            >
                Previous
            </button>
            <button
                onClick={()=>handlePageChange(currentPage+1)}
                disabled={currentPage === totalPages}
                className="page-button"
            >
                next
            </button>
        </div>
    )
}

export default Pagination